package com.example.gameapp.service.repository;

import com.example.gameapp.service.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {}
