import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventInnerComponent } from './event-inner/event-inner.component';
import { EventNewComponent } from './event-new/event-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventInnerComponent,
    EventNewComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventModule {
}
