import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Map, MapStyle, config } from '@maptiler/sdk';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-map',
  standalone:false,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  searchQuery: string = '';

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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
    }
  }

  async searchCity() {
    if (this.searchQuery.trim() === '') return;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${this.searchQuery}&format=json`
      );
      if (response.data && response.data.length > 0) {
        const { lon, lat } = response.data[0];
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

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.map?.remove();
    }
  }
}
