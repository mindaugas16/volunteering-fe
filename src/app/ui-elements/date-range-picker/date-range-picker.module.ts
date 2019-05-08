import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [DateRangePickerComponent],
  exports: [
    DateRangePickerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    DropdownModule
  ]
})
export class DateRangePickerModule { }
