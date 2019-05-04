import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { SharedModule } from '../shared/shared.module';
import { EventsSearchPanelComponent } from './events-search-panel/events-search-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { EventsListItemComponent } from './events-list/events-list-item/events-list-item.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsSearchPanelComponent,
    EventsListItemComponent,
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
