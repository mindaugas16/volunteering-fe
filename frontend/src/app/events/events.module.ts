import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventComponent } from './events-list/event/event.component';
import { SharedModule } from '../shared/shared.module';
import { EventInnerComponent } from './event-inner/event-inner.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventComponent,
    EventInnerComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule { }
