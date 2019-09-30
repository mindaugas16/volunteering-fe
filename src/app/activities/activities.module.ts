import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityEditModalComponent } from './activity-edit-modal/activity-edit-modal.component';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../ui-elements/dropdown/dropdown.module';
import { BreadcrumbModule } from '../ui-elements/breadcrumb/breadcrumb.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '../ui-elements/date-range-picker/date-range-picker.module';
import { FormMessageModule } from '../ui-elements/form-message/form-message.module';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesSearchListComponent } from './activities/activities-search-list/activities-search-list.component';
import { PaginationModule } from '../ui-elements/pagination/pagination.module';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivityEditModalComponent,
    ActivitiesComponent,
    ActivitiesSearchListComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    GenericModalModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    BreadcrumbModule,
    NgbModule,
    DateRangePickerModule,
    FormMessageModule,
    PaginationModule
  ],
  entryComponents: [
    ActivityEditModalComponent,
  ],
  exports: [
    ActivityEditModalComponent
  ]
})
export class ActivitiesModule {
}
