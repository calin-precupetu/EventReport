package ro.pub.cs.systems.eim.eventreportandroid.network;

import java.time.Instant;

public class EventPayload {
    private String email;
    private String type;
    private String description;
    private double coordinate_lat;
    private double coordinate_long;
    private String timestamp;

    public EventPayload(String email, String type, String description, double coordinate_lat, double coordinate_long) {
        this.email = email;
        this.type = type;
        this.description = description;
        this.coordinate_lat = coordinate_lat;
        this.coordinate_long = coordinate_long;
        this.timestamp = new java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                .format(new java.util.Date(System.currentTimeMillis()));
    }

    @Override
    public String toString() {
        return "EventPayload{" +
                "email='" + email + '\'' +
                ", type='" + type + '\'' +
                ", description='" + description + '\'' +
                ", coordinate_lat=" + coordinate_lat +
                ", coordinate_long=" + coordinate_long +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
