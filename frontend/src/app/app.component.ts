import { Component, OnInit } from '@angular/core';
import { EventService, EventFrontendDto } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'harta';
  center: google.maps.LatLngLiteral = { lat: 44.4268, lng: 26.1025 }; // Centru pe București
  zoom = 14;

  markers: { lat: number; lng: number; id: string }[] = []; // Adaugăm ID-ul pentru fiecare marker
  selectedEvent: any;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(
      (events: EventFrontendDto[]) => {
        this.markers = events.map((event) => ({
          lat: event.latitude,
          lng: event.longitude,
          id: event.id,
        }));
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  onMarkerClick(markerId: string): void {
    this.eventService.getEventById(markerId).subscribe(res =>{
      console.log(res)
      this.selectedEvent = Array.isArray(res) ? res[0] : res;
    }
    );
    
  }
  
  
}
