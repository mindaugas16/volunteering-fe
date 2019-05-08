import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownToggleDirective } from './directives/dropdown-toggle.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { DropdownContentDirective } from './directives/dropdown-content.directive';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownDirective,
    DropdownToggleDirective,
    DropdownContentDirective,
  ],
  exports: [
    DropdownComponent,
    DropdownDirective,
    DropdownToggleDirective,
    DropdownContentDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class DropdownModule {
}
