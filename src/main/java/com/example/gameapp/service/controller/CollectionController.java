package com.example.gameapp.service.controller;

import com.example.gameapp.service.model.Collection;
import com.example.gameapp.service.model.Recharge;
import com.example.gameapp.service.repository.CollectionRepository;
import com.example.gameapp.service.repository.RechargeRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    private final CollectionRepository collectionRepository;
    private final RechargeRepository rechargeRepository;

    public CollectionController(CollectionRepository collectionRepository, RechargeRepository rechargeRepository) {
        this.collectionRepository = collectionRepository;
        this.rechargeRepository = rechargeRepository;
    }

    @GetMapping
    public List<Collection> getAll() { return collectionRepository.findAll(); }

    @PostMapping
    public Collection add(@RequestBody Collection collection) { return collectionRepository.save(collection); }

    // ✅ Get total recharges on a given date
    @GetMapping("/total-recharges")
    public double getTotalRecharges(@RequestParam String date) {
        List<Recharge> recharges = rechargeRepository.findAll();
        return recharges.stream()
                .filter(r -> r.getDate().toString().startsWith(date))
                .mapToDouble(Recharge::getAmount)
                .sum();
    }
}
