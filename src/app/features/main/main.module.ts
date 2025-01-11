import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MapComponent } from './map/map.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule
  ]
})
export class MainModule { }
