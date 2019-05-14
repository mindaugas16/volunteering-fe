import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventStatusLabelComponent } from './event-status-label/event-status-label.component';

@NgModule({
  declarations: [EventStatusLabelComponent],
  imports: [
    CommonModule
  ],
  exports: [
    EventStatusLabelComponent
  ]
})
export class EventStatusLabelModule {
}
