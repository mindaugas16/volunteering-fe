import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMessageComponent } from './header-message/header-message.component';

@NgModule({
  declarations: [HeaderMessageComponent],
  exports: [
    HeaderMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeaderMessageModule { }
