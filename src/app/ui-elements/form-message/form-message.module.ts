import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMessageComponent } from './form-message/form-message.component';

@NgModule({
  declarations: [FormMessageComponent],
  exports: [
    FormMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FormMessageModule { }
