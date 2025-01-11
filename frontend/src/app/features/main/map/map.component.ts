import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Map, Marker, MapStyle, config } from '@maptiler/sdk';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEventDialogComponent } from '../../../add-event-dialog/add-event-dialog.component';
import { EventDetailsDialogComponent } from '../../../event-details-dialog/event-details-dialog.component';
import { MapEventsService } from '../../../services/map-events.service';

@Component({
  selector: 'app-map',
  standalone: false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  searchQuery: string = '';
  markers: Marker[] = [];
  events: any[] = [];

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private dialog: MatDialog,
    private mapEventsService: MapEventsService
  ) {}

  ngOnInit(): void {
    config.apiKey = '6g50WEF1s7adz3kx0N1A';
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const initialState = { lng: 26.1025, lat: 44.4268, zoom: 14 };

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      this.fetchAndDisplayEvents();

      this.map.on('click', (event) => this.onMapClick(event));
    }
  }

  async searchCity() {
    if (this.searchQuery.trim() === '') return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${this.searchQuery}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lon, lat } = data[0];
        this.map?.flyTo({
          center: [parseFloat(lon), parseFloat(lat)],
          zoom: 14,
        });
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching city coordinates:', error);
    }
  }
  fetchAndDisplayEvents() {
    this.mapEventsService.getAllEvents().subscribe(
      (events) => {
        this.clearMarkers();
        events.forEach((event) => {
          console.log('Processing event:', event);
  
          if (
            event.coordinateLat != null &&
            event.coordinateLong != null &&
            !isNaN(event.coordinateLat) &&
            !isNaN(event.coordinateLong) &&
            event.id // Asigură-te că ID-ul există
          ) {
            const marker = new Marker({ color: 'red' })
              .setLngLat([event.coordinateLong, event.coordinateLat])
              .addTo(this.map!);
  
            marker.getElement().addEventListener('click', () => {
              console.log('Marker clicked, event ID:', event.id);
              this.onMarkerClick(event.id);
            });
  
            this.markers.push(marker);
          } else {
            console.warn('Invalid event data:', event);
          }
        });
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  clearMarkers() {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  onMapClick(event: any) {
    const features = this.map?.queryRenderedFeatures(event.point);
    if (features && features.length > 0) {
      // Clicul a fost pe un marker; nu deschide dialogul de adăugare
      return;
    }
    const lngLat = event.lngLat;
    const tempMarker = new Marker({ color: 'blue' })
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(this.map!);
    this.openAddEventDialog(lngLat, tempMarker);
  }
  
  
  openAddEventDialog(lngLat: any, tempMarker: Marker) {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px',
      data: { coordinate_lat: lngLat.lat, coordinate_long: lngLat.lng },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveEvent(result);
      }
      tempMarker.remove();
    });
  }

  saveEvent(eventData: any) {
    if (
      eventData.coordinate_lat != null &&
      eventData.coordinate_long != null &&
      !isNaN(eventData.coordinate_lat) &&
      !isNaN(eventData.coordinate_long)
    ) {
      this.mapEventsService.saveEvent(eventData).subscribe(
        () => this.fetchAndDisplayEvents(),
        (error) => console.error('Error saving event:', error)
      );
    } else {
      console.error('Invalid coordinates for event:', eventData);
    }
  }

  onMarkerClick(eventId: string | undefined) {
    console.log('Marker clicked, event ID:', eventId);
  
    if (!eventId) {
      console.error('Invalid event ID, dialog will not open');
      return;
    }
  
    this.dialog.open(EventDetailsDialogComponent, {
      width: '400px',
      data: { eventId }, // Transmiterea eventId către dialog
    });
  }
  
  
  
  
  
  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.map?.remove();
    }
  }
}
