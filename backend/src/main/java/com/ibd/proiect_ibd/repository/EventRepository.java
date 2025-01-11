package com.ibd.proiect_ibd.repository;

import com.ibd.proiect_ibd.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long>
{
}
