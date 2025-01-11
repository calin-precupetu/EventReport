package com.ibd.proiect_ibd.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false, length = 255)
    private String type;

    @Column(name = "coordinate_lat", nullable = false)
    private double coordinateLat;

    @Column(name = "coordinate_long", nullable = false)
    private double coordinateLong;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "email_user", nullable = false, length = 255)
    private String emailUser;

    public Event() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getCoordinateLat() {
        return coordinateLat;
    }

    public void setCoordinateLat(double coordinateLat) {
        this.coordinateLat = coordinateLat;
    }

    public double getCoordinateLong() {
        return coordinateLong;
    }

    public void setCoordinateLong(double coordinateLong) {
        this.coordinateLong = coordinateLong;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getEmailUser() {
        return emailUser;
    }

    public void setEmailUser(String emailUser) {
        this.emailUser = emailUser;
    }
}
