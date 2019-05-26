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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { TagsModule } from '../ui-elements/tags/tags.module';
import { BreadcrumbModule } from '../ui-elements/breadcrumb/breadcrumb.module';
import { AbstractLabelModule } from '../ui-elements/abstract-label/abstract-label.module';
import { EventInnerComponent } from './event/event-inner/event-inner.component';
import { RewardVolunteersComponent } from './event/reward-volunteers/reward-volunteers.component';
import { UploadImageModule } from '../ui-elements/upload-image/upload-image.module';
import { PaginationModule } from '../ui-elements/pagination/pagination.module';
import { EventsFiltersComponent } from './events-filters/events-filters.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsSearchPanelComponent,
    EventsListCardComponent,
    EventsComponent,
    EventEditComponent,
    EventInnerComponent,
    RewardVolunteersComponent,
    EventsFiltersComponent
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
    NgbModule,
    GenericModalModule,
    TagsModule,
    BreadcrumbModule,
    AbstractLabelModule,
    UploadImageModule,
    PaginationModule
  ],
  entryComponents: [
    RewardVolunteersComponent
  ]
})
export class EventsModule {
}
