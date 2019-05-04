import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventInnerComponent } from './event-inner/event-inner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventEditComponent } from './event-edit/event-edit.component';
import { SharedModule } from '../shared/shared.module';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangePickerModule } from '../ui-elements/date-range-picker/date-range-picker.module';
import { TranslateModule } from '@ngx-translate/core';
import { MapModule } from '../ui-elements/map/map.module';
import { TagsModule } from '../ui-elements/tags/tags.module';

@NgModule({
  declarations: [
    EventInnerComponent,
    EventEditComponent
  ],
  exports: [
    EventEditComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    GenericModalModule,
    SharedModule,
    DateRangePickerModule,
    TranslateModule,
    MapModule,
    TagsModule
  ],
  entryComponents: [
    EventEditComponent
  ]
})
export class EventModule {
}
