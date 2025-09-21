package com.example.gameapp.service.repository;

import com.example.gameapp.service.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {}
