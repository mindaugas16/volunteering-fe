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
import { EventStatusLabelModule } from '../ui-elements/event-status-label/event-status-label.module';
import { TagModule } from '../ui-elements/tag/tag.module';
import { EventEditComponent } from './event-edit/event-edit.component';
import { DateRangePickerModule } from '../ui-elements/date-range-picker/date-range-picker.module';
import { CustomFieldModule } from '../ui-elements/custom-field/custom-field.module';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsSearchPanelComponent,
    EventsListCardComponent,
    EventsComponent,
    EventEditComponent,
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
    TranslateModule,
    EventStatusLabelModule,
    TagModule,
    DateRangePickerModule,
    CustomFieldModule,
  ]
})
export class EventsModule {
}
