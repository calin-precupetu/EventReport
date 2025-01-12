import { Component, OnInit } from '@angular/core';
import { EventService, EventFrontendDto } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'harta';
  center: google.maps.LatLngLiteral = { lat: 44.4268, lng: 26.1025 }; // Centru pe București
  zoom = 14;

  markers: google.maps.LatLngLiteral[] = []; 

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      (events: any[]) => {
        this.markers = events
          .map(event => {
            const lat = Number(event.coordinateLat); 
            const lng = Number(event.coordinateLong); 
  
            if (!isNaN(lat) && !isNaN(lng)) {
              return { lat, lng };
            }
            return null; 
          })
          .filter((marker): marker is google.maps.LatLngLiteral => marker !== null); 
      }
    );
  }
  
  
}
