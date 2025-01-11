import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    MainComponent,
    MapComponent,

  ],
  imports: [
    CommonModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
