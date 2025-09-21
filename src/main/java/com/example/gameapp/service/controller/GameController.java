package com.example.gameapp.service.controller;

import com.example.gameapp.service.model.Game;
import com.example.gameapp.service.repository.GameRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

    private final GameRepository gameRepository;
    public GameController(GameRepository gameRepository) { this.gameRepository = gameRepository; }

    @GetMapping
    public List<Game> getAll() { return gameRepository.findAll(); }

    @PostMapping
    public Game add(@RequestBody Game game) { return gameRepository.save(game); }

    // ✅ Update endpoint with validation
    @PutMapping("/{id}")
    public Game update(@PathVariable String id, @RequestBody Game game) {
        return gameRepository.findById(id).map(existing -> {
            existing.setName(game.getName());
            existing.setPrice(game.getPrice());
            existing.setDescription(game.getDescription());
            existing.setMinPlayers(game.getMinPlayers());
            existing.setMaxPlayers(game.getMaxPlayers());
            existing.setPlayerMultiple(game.getPlayerMultiple());
            existing.setStatus(game.getStatus());
            existing.setDuration(game.getDuration());
            return gameRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Game not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) { gameRepository.deleteById(id); }
}
