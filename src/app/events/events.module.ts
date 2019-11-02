import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { AbstractLabelModule } from '../ui-elements/abstract-label/abstract-label.module';
import { BreadcrumbModule } from '../ui-elements/breadcrumb/breadcrumb.module';
import { CustomFieldModule } from '../ui-elements/custom-field/custom-field.module';
import { DateRangePickerModule } from '../ui-elements/date-range-picker/date-range-picker.module';
import { EventStatusLabelModule } from '../ui-elements/event-status-label/event-status-label.module';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { PaginationModule } from '../ui-elements/pagination/pagination.module';
import { TagModule } from '../ui-elements/tag/tag.module';
import { TagsModule } from '../ui-elements/tags/tags.module';
import { UploadImageModule } from '../ui-elements/upload-image/upload-image.module';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventInnerComponent } from './event/event-inner/event-inner.component';
import { RewardVolunteersComponent } from './event/reward-volunteers/reward-volunteers.component';
import { EventsFiltersComponent } from './events-filters/events-filters.component';
import { EventsListCardComponent } from './events-list/events-list-card/events-list-card.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventsSearchPanelComponent } from './events-search-panel/events-search-panel.component';
import { EventsComponent } from './events/events.component';

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
  exports: [EventsListComponent],
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
    PaginationModule,
    DragDropModule
  ],
  entryComponents: [RewardVolunteersComponent]
})
export class EventsModule {}
