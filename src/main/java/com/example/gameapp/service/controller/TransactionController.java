package com.example.gameapp.service.controller;

import com.example.gameapp.service.model.Transaction;
import com.example.gameapp.service.model.Member;
import com.example.gameapp.service.model.Game;
import com.example.gameapp.service.repository.TransactionRepository;
import com.example.gameapp.service.repository.MemberRepository;
import com.example.gameapp.service.repository.GameRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final MemberRepository memberRepository;
    private final GameRepository gameRepository;

    public TransactionController(TransactionRepository transactionRepository,
                                 MemberRepository memberRepository,
                                 GameRepository gameRepository) {
        this.transactionRepository = transactionRepository;
        this.memberRepository = memberRepository;
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<Transaction> getAll() {
        List<Transaction> transactions = transactionRepository.findAll();
        for (Transaction t : transactions) {
            memberRepository.findById(t.getMemberId())
                    .ifPresent(m -> t.setMemberName(m.getName()));
            gameRepository.findById(t.getGameId())
                    .ifPresent(g -> t.setGameName(g.getName()));
        }
        return transactions;
    }

    @PostMapping
    public Transaction add(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @PutMapping("/{id}")
    public Transaction update(@PathVariable String id, @RequestBody Transaction transaction) {
        return transactionRepository.findById(id).map(existing -> {
            existing.setMemberId(transaction.getMemberId());
            existing.setGameId(transaction.getGameId());
            existing.setAmount(transaction.getAmount());
            existing.setDate(transaction.getDate());
            // update names for frontend convenience
            memberRepository.findById(transaction.getMemberId())
                    .ifPresent(m -> existing.setMemberName(m.getName()));
            gameRepository.findById(transaction.getGameId())
                    .ifPresent(g -> existing.setGameName(g.getName()));
            return transactionRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Transaction not found"));
    }
}
