package com.example.gameapp.service.repository;

import com.example.gameapp.service.model.Recharge;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RechargeRepository extends MongoRepository<Recharge, String> {}
