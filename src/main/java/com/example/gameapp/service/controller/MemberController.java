package com.example.gameapp.service.controller;

import com.example.gameapp.service.model.Member;
import com.example.gameapp.service.repository.MemberRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberRepository memberRepository;
    public MemberController(MemberRepository memberRepository) { this.memberRepository = memberRepository; }

    @GetMapping
    public List<Member> getAll() { return memberRepository.findAll(); }

    @PostMapping
    public Member add(@RequestBody Member member) { return memberRepository.save(member); }

    @GetMapping("/{id}")
    public Member getById(@PathVariable String id) { return memberRepository.findById(id).orElse(null); }

    // ✅ Update endpoint
    @PutMapping("/{id}")
    public Member update(@PathVariable String id, @RequestBody Member member) {
        return memberRepository.findById(id).map(existing -> {
            existing.setName(member.getName());
            existing.setEmail(member.getEmail());
            existing.setPhone(member.getPhone());
            return memberRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Member not found"));
    }
}
