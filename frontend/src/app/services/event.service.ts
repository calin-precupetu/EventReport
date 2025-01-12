import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface EventFrontendDto {
  id: string;
  name: string; // Tipul evenimentului
  latitude: number;
  longitude: number;
  type?: string; // tipul evenimentului
  description?: string; // descrierea evenimentului
  timestamp?: string; // timestamp-ul evenimentului
  emailUser?: string; // email-ul utilizatorului
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:9090/report';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventFrontendDto[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-events/all`).pipe(
      map((events) =>
        events.map((event) => ({
          id: event.id.toString(),
          name: event.type,
          latitude: event.coordinateLat,
          longitude: event.coordinateLong,
          type: event.type,
          description: event.description,
          timestamp: event.timestamp,
          emailUser: event.emailUser,
        }))
      )
    );
  }

  getEventById(eventId: string): Observable<EventFrontendDto> {
    return this.http.get<any>(`${this.baseUrl}/get-events/${eventId}`).pipe(
      map((event) => {
        return event;
      })
    );
  }
  

  reportEvent(eventData: { [key: string]: string }): Observable<boolean> {
    console.log(eventData)
    return this.http.post<boolean>(`${this.baseUrl}/report-event`, eventData);
  }

  deleteEvent(eventData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/delete-event`, eventData);
  }
}
