package com.example.gameapp.service.repository;

import com.example.gameapp.service.model.Collection;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.Optional;

// Renamed interface to avoid conflict
public interface CollectionRepo extends MongoRepository<Collection, String> {
    Optional<Collection> findByDate(LocalDate date);
}
