import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from './custom-field/custom-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CustomFieldComponent],
  exports: [
    CustomFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CustomFieldModule { }
