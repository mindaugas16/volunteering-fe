import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from './language-switch/language-switch.component';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [LanguageSwitchComponent],
  exports: [
    LanguageSwitchComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
  ]
})
export class LanguageSwitchModule { }
