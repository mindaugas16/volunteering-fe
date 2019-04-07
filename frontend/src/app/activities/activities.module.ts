import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { ActivityEditModalComponent } from './activity-edit-modal/activity-edit-modal.component';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../ui-elements/dropdown/dropdown.module';

@NgModule({
  declarations: [
    ActivitiesListComponent,
    ActivityEditModalComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    GenericModalModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ],
  entryComponents: [
    ActivityEditModalComponent
  ],
  exports: [
    ActivityEditModalComponent
  ]
})
export class ActivitiesModule {
}
