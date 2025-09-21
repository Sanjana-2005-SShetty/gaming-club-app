package com.example.gameapp.service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "collections")
public class Collection {
    @Id
    private String id;
    private LocalDate date;
    private double totalRecharges;

    public Collection() {}

    public Collection(LocalDate date, double totalRecharges) {
        this.date = date;
        this.totalRecharges = totalRecharges;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public double getTotalRecharges() { return totalRecharges; }
    public void setTotalRecharges(double totalRecharges) { this.totalRecharges = totalRecharges; }
}
