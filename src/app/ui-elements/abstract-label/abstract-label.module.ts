import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractLabelComponent } from './abstract-label/abstract-label.component';

@NgModule({
  declarations: [AbstractLabelComponent],
  exports: [
    AbstractLabelComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AbstractLabelModule { }
