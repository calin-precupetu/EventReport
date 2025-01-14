import { Component, OnInit } from '@angular/core';
import { EventService, EventFrontendDto } from './services/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'harta';
  center: google.maps.LatLngLiteral = { lat: 44.4268, lng: 26.1025 }; 
  zoom = 14;

  markers: { lat: number; lng: number; id: string }[] = []; 
  selectedEvent: any; 
  isAddEventVisible = false; 
newEvent = {
  type: '',
  coordinateLat: null as number | null,
  coordinateLong: null as number | null,
  description: '',
  emailUser: ''
};


  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.refreshMarkers();
  }

  onMarkerClick(markerId: string): void {
    this.eventService.getEventById(markerId).subscribe(
      (res) => {
        this.selectedEvent = Array.isArray(res) ? res[0] : res;
      },
      (error) => {
        console.error('Eroare la încărcarea detaliilor evenimentului:', error);
      }
    );
  }

  closeEventDetails(): void {
    this.selectedEvent = null; 
  }

  onAddEvent(): void {
    const eventWithMappedKeys = {
      type: this.newEvent.type,
      coordinate_lat: this.newEvent.coordinateLat !== null ? this.newEvent.coordinateLat.toString() : '',
      coordinate_long: this.newEvent.coordinateLong !== null ? this.newEvent.coordinateLong.toString() : '',
      description: this.newEvent.description,
      timestamp: new Date().toISOString(),
      email: this.newEvent.emailUser,
    };
  
    console.log('Payload trimis:', eventWithMappedKeys); 
  
    this.eventService.reportEvent(eventWithMappedKeys).subscribe(
      (response) => {
        console.log('Eveniment adăugat cu succes:', response);
        this.isAddEventVisible = false;
        this.newEvent = { type: '', coordinateLat: null, coordinateLong: null, description: '', emailUser: '' };
        this.refreshMarkers();
      },
      (error) => {
        console.error('Eroare la trimiterea evenimentului:', error);
      }
    );
  }
  
  

  toggleAddEvent(): void {
    this.isAddEventVisible = !this.isAddEventVisible;
  }

  refreshMarkers(): void {
    this.eventService.getAllEvents().subscribe(
      (events: EventFrontendDto[]) => {
        this.markers = events.map((event) => ({
          lat: event.latitude,
          lng: event.longitude,
          id: event.id,
        }));
      },
      (error) => {
        console.error('Eroare la reîmprospătarea markerelor:', error);
      }
    );
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.newEvent.coordinateLat = event.latLng.lat();
      this.newEvent.coordinateLong = event.latLng.lng();
      this.isAddEventVisible = true; 
    }
  }

  onDeleteEvent(eventId: string): void {
      this.eventService.deleteEvent(eventId).subscribe( event => {
        this.refreshMarkers();
      });
      
    }

  
}
