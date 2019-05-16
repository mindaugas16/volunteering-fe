import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../environments/environment';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
