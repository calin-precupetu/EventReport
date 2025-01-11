import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MapComponent } from './map/map.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AddEventDialogComponent } from '../../add-event-dialog/add-event-dialog.component'; 
import { EventDetailsDialogComponent } from '../../event-details-dialog/event-details-dialog.component'; 

@NgModule({
  declarations: [
    MainComponent,
    MapComponent,
    AddEventDialogComponent,
    EventDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    
  ]
})
export class MainModule { }
