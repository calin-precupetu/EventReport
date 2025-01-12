import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventFrontendDto {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:9090/report';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-events/all`);
  }

  saveEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/report-event`, eventData);
  }

  deleteEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/delete-event`, eventData);
  }

  getEventById(eventId: string): Observable<any> {
    if (!eventId) {
      console.error('getEventById called with undefined eventId');
      throw new Error('Invalid event ID');
    }
    return this.http.get<any>(`${this.baseUrl}/get-events/${eventId}`);
  }
}
