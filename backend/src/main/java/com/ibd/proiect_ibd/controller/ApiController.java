package com.ibd.proiect_ibd.controller;

import com.ibd.proiect_ibd.model.EventDto;
import com.ibd.proiect_ibd.model.EventFrontendDto;
import com.ibd.proiect_ibd.service.ProiectIbdService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/report")
public class ApiController
{
    @Autowired
    private ProiectIbdService proiectIbdService;

    @GetMapping("/get-events/{id}")
    @Transactional
    public ResponseEntity<List<EventFrontendDto>> getEvents(@PathVariable("id") String id)
    {
        List<EventFrontendDto> allEvents = proiectIbdService.getAllEvents(id);
        return ResponseEntity.ok().body(allEvents);
    }

    @PostMapping("/report-event")
    @Transactional
    public ResponseEntity<Boolean> reportEvent(@RequestBody Map<String, String> payload)
    {
        proiectIbdService.saveEvent(payload);
        return ResponseEntity.ok().body(true);
    }

    @PostMapping("/delete-event")
    @Transactional
    public ResponseEntity<Boolean> deleteEvent(@RequestBody Map<String, String> payload)
    {
        Boolean response = proiectIbdService.deleteEvent(payload);

        if (response.equals(Boolean.FALSE)) return ResponseEntity.ok().body(false);

        return ResponseEntity.ok().body(true);
    }
}
