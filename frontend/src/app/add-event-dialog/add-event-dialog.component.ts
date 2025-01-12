import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MapEventsService } from '../services/map-events.service';

@Component({
  selector: 'app-add-event-dialog',
  standalone: false,
  templateUrl: './add-event-dialog.component.html',
})
export class AddEventDialogComponent {
  event: any;
  isSaving: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mapEventsService: MapEventsService
  ) {

    this.event = {
      type: '',
      description: '',
      email: '',
      coordinate_lat: this.data.coordinate_lat,
      coordinate_long: this.data.coordinate_long,
    };
  }

  save() {
    if (this.isSaving) {
      console.warn('Save already in progress.');
      return;
    }

    this.isSaving = true; 
    this.event.timestamp = new Date().toISOString();

    this.mapEventsService.saveEvent(this.event).subscribe(
      (response) => {
        console.log('Event saved successfully:', response);
        this.isSaving = false; 
        this.dialogRef.close(this.event);
      },
      (error) => {
        console.error('Error saving event:', error);
        this.isSaving = false; 
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }
}
