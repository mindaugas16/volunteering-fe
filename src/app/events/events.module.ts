import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventsSearchPanelComponent } from './events-search-panel/events-search-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EventsListCardComponent } from './events-list/events-list-card/events-list-card.component';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsSearchPanelComponent,
    EventsListCardComponent,
    EventsComponent,
  ],
  exports: [
    EventsListComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class EventsModule {
}
