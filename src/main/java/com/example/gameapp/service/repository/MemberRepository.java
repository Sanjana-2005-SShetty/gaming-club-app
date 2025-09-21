package com.example.gameapp.service.repository;

import com.example.gameapp.service.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemberRepository extends MongoRepository<Member, String> {}
