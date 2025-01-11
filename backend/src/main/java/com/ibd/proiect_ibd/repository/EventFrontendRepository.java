package com.ibd.proiect_ibd.repository;

import com.ibd.proiect_ibd.model.Event;
import com.ibd.proiect_ibd.model.EventFrontend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventFrontendRepository extends JpaRepository<EventFrontend, Long>
{
}
