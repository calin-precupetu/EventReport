import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapEventsService } from '../services/map-events.service';

@Component({
  selector: 'app-event-details-dialog',
  standalone: false,
  
  templateUrl: './event-details-dialog.component.html',
  styleUrl: './event-details-dialog.component.scss'
})
export class EventDetailsDialogComponent {
  event: any;

  constructor(
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string },
    private mapEventsService: MapEventsService
  ) {}

  ngOnInit() {
    this.fetchEventDetails();
  }

  fetchEventDetails() {
    this.mapEventsService.getEventById(this.data.eventId).subscribe(
      (response) => {
        this.event = response;
      },
      (error) => {
        console.error('Error fetching event details:', error);
        this.dialogRef.close();
      }
    );
  }

  deleteEvent() {
    if (confirm('Are you sure you want to delete this event?')) {
      this.mapEventsService.deleteEvent({ id: this.data.eventId }).subscribe(
        (response) => {
          if (response) {
            console.log('Event deleted successfully');
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

  close() {
    this.dialogRef.close();
  }
}
