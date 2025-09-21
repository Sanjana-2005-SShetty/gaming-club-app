package com.example.gameapp.service.controller;

import com.example.gameapp.service.model.Recharge;
import com.example.gameapp.service.model.Collection;
import com.example.gameapp.service.repository.RechargeRepository;
import com.example.gameapp.service.repository.CollectionRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/recharges")
public class RechargeController {

    private final RechargeRepository rechargeRepository;
    private final CollectionRepository collectionRepository;

    public RechargeController(RechargeRepository rechargeRepository, CollectionRepository collectionRepository) {
        this.rechargeRepository = rechargeRepository;
        this.collectionRepository = collectionRepository;
    }

    @GetMapping
    public List<Recharge> getAll() {
        return rechargeRepository.findAll();
    }

    @PostMapping
    public Recharge add(@RequestBody Recharge recharge) {
        // Save recharge
        Recharge saved = rechargeRepository.save(recharge);

        // Update daily total in Collection
        LocalDate rechargeDate = recharge.getDate().toLocalDate();
        Collection coll = collectionRepository.findByDate(rechargeDate)
                .orElse(new Collection(rechargeDate, 0));
        coll.setTotalRecharges(coll.getTotalRecharges() + recharge.getAmount());
        collectionRepository.save(coll);

        return saved;
    }

    @PutMapping("/{id}")
    public Recharge update(@PathVariable String id, @RequestBody Recharge recharge) {
        return rechargeRepository.findById(id).map(existing -> {
            double oldAmount = existing.getAmount();
            LocalDate oldDate = existing.getDate().toLocalDate();

            // Update recharge fields
            existing.setAmount(recharge.getAmount());
            existing.setDate(recharge.getDate());
            existing.setMemberName(recharge.getMemberName());

            Recharge updated = rechargeRepository.save(existing);

            // Update old Collection (subtract old amount)
            Collection oldColl = collectionRepository.findByDate(oldDate)
                    .orElse(new Collection(oldDate, 0));
            oldColl.setTotalRecharges(oldColl.getTotalRecharges() - oldAmount);
            collectionRepository.save(oldColl);

            // Update new Collection (add new amount)
            LocalDate newDate = recharge.getDate().toLocalDate();
            Collection newColl = collectionRepository.findByDate(newDate)
                    .orElse(new Collection(newDate, 0));
            newColl.setTotalRecharges(newColl.getTotalRecharges() + recharge.getAmount());
            collectionRepository.save(newColl);

            return updated;
        }).orElseThrow(() -> new RuntimeException("Recharge not found"));
    }
}
