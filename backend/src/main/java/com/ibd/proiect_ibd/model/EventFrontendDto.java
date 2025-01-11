package com.ibd.proiect_ibd.model;

import java.time.LocalDateTime;

public class EventFrontendDto
{
    private Long id;
    private String type;
    private double coordinateLat;
    private double coordinateLong;
    private String description;
    private LocalDateTime timestamp;
    private String emailUser;

    public EventFrontendDto() {
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
