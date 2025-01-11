import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapEventsService } from '../services/map-events.service';
import { Event } from '../interfaces/Event';

@Component({
  selector: 'app-event-details-dialog',
  standalone: false,
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.scss']
})
export class EventDetailsDialogComponent {
  event: Event | null = null;
  loading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private mapEventsService: MapEventsService
  ) {
    this.fetchEventDetails();
  }

  fetchEventDetails() {
    this.mapEventsService.getEventById(this.data.eventId).subscribe(
      (response: Event) => {
        if (Array.isArray(response)) {
          this.event = response[0];
        } else {
          this.event = response;
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching event details:', error);
        this.loading = false;
        this.dialogRef.close();
      }
    );
  }
  
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  formatKey(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  }
  
  formatValue(key: string, value: any): any {
    if (key === 'timestamp' && typeof value === 'string') {
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}.${month}.${year}`; // Formatare dd.mm.yyyy
    }
    return value;
  }
  


  close() {
    this.dialogRef.close();
  }

  deleteEvent() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.mapEventsService.deleteEvent({ id: this.data.eventId }).subscribe(
        (response) => {
          if (response) {
            this.dialogRef.close(true);
          } else {
            console.error('Failed to delete event');
          }
        },
        (error) => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }
}
