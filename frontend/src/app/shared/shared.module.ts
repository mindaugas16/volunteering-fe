import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { DropdownToggleDirective } from './directives/dropdown/dropdown-toggle.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    DropdownToggleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropdownDirective,
    DropdownToggleDirective
  ]
})
export class SharedModule { }
