import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CustomFieldComponent } from './custom-field/custom-field.component';

@NgModule({
  declarations: [CustomFieldComponent],
  exports: [CustomFieldComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule]
})
export class CustomFieldModule {}
