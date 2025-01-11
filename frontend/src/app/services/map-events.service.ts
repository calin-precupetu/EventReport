import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapEventsService {
  private baseUrl = 'http://localhost:9090/report';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-events`);
  }

  saveEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/report-event`, eventData);
  }

  deleteEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/delete-event`, eventData);
  }

  getEventById(eventId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-events/${eventId}`);
  }
}
