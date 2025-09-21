package com.example.gameapp.service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {
    @Id
    private String id;
    private String name;
    private double price;
    private String description;
    private int minPlayers;
    private int maxPlayers;
    private int playerMultiple;
    private String status;
    private String duration;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public int getMinPlayers() { return minPlayers; }
    public void setMinPlayers(int minPlayers) { this.minPlayers = minPlayers; }
    public int getMaxPlayers() { return maxPlayers; }
    public void setMaxPlayers(int maxPlayers) { this.maxPlayers = maxPlayers; }
    public int getPlayerMultiple() { return playerMultiple; }
    public void setPlayerMultiple(int playerMultiple) { this.playerMultiple = playerMultiple; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}
