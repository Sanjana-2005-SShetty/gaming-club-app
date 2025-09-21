package com.example.gameapp.service.repository;

import com.example.gameapp.service.model.Collection;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.Optional;

public interface CollectionRepository extends MongoRepository<Collection, String> {
    Optional<Collection> findByDate(LocalDate date);
}
