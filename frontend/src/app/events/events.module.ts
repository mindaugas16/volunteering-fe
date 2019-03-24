import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventComponent } from './events-list/event/event.component';
import { SharedModule } from '../shared/shared.module';
import { EventInnerComponent } from './event-inner/event-inner.component';
import { EventsSearchPanelComponent } from './events-search-panel/events-search-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventsListComponent,
    EventComponent,
    EventInnerComponent,
    EventsSearchPanelComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EventsModule {
}
