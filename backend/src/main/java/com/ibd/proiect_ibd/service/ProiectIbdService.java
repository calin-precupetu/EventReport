package com.ibd.proiect_ibd.service;

import com.ibd.proiect_ibd.model.Event;
import com.ibd.proiect_ibd.model.EventFrontend;
import com.ibd.proiect_ibd.model.EventFrontendDto;
import com.ibd.proiect_ibd.repository.EventFrontendRepository;
import com.ibd.proiect_ibd.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProiectIbdService
{
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventFrontendRepository eventFrontendRepository;

    public List<EventFrontendDto> getAllEvents(String id)
    {
        if (id == null || id.equals("all"))
        {
            List<EventFrontend> eventsFromDb = eventFrontendRepository.findAll();
            return eventsFromDb.stream().map(this::eventToDto).collect(Collectors.toList());
        }
        Optional<EventFrontend> eventFrontendOptional = eventFrontendRepository.findById(Long.parseLong(id));

        return eventFrontendOptional.map(eventFrontend -> List.of(eventToDto(eventFrontend))).orElseGet(List::of);
    }

    public void saveEvent(Map<String, String> payload)
    {
        Event newEvent = new Event();

        newEvent.setType(payload.get("type"));
        newEvent.setCoordinateLat(Double.parseDouble(payload.get("coordinate_lat")));
        newEvent.setCoordinateLong(Double.parseDouble(payload.get("coordinate_long")));
        newEvent.setDescription(payload.get("description"));
        Instant instant = Instant.parse(payload.get("timestamp"));
        LocalDateTime localDateTime = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
        newEvent.setTimestamp(localDateTime);
        newEvent.setEmailUser(payload.get("email"));

//       eventRepository.save(newEvent);
        eventFrontendRepository.save(eventToFrontend(newEvent));
    }


    public Boolean deleteEvent(Map<String, String> payload)
    {
        Long id = Long.valueOf(payload.get("id"));
        Optional<EventFrontend> eventToDelete = eventFrontendRepository.findById(id);

        if (eventToDelete.isEmpty()) return Boolean.FALSE;

        eventFrontendRepository.delete(eventToDelete.get());
        return Boolean.TRUE;
    }

    private EventFrontendDto eventToDto(EventFrontend event)
    {
        EventFrontendDto eventFrontendDto = new EventFrontendDto();
        eventFrontendDto.setId(event.getId());
        eventFrontendDto.setType(event.getType());
        eventFrontendDto.setCoordinateLat(event.getCoordinateLat());
        eventFrontendDto.setCoordinateLong(event.getCoordinateLong());
        eventFrontendDto.setDescription(event.getDescription());
        eventFrontendDto.setTimestamp(event.getTimestamp());
        eventFrontendDto.setEmailUser(event.getEmailUser());
        return eventFrontendDto;
    }

    private EventFrontend eventToFrontend(Event event)
    {
        EventFrontend eventFrontend = new EventFrontend();

        eventFrontend.setType(event.getType());
        eventFrontend.setCoordinateLat(event.getCoordinateLat());
        eventFrontend.setCoordinateLong(event.getCoordinateLong());
        eventFrontend.setDescription(event.getDescription());
        eventFrontend.setTimestamp(event.getTimestamp());
        eventFrontend.setEmailUser(event.getEmailUser());

        return eventFrontend;
    }
}
