import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownToggleDirective } from './directives/dropdown-toggle.directive';
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownDirective,
    DropdownToggleDirective,
  ],
  exports: [
    DropdownComponent,
    DropdownDirective,
    DropdownToggleDirective,
  ],
  imports: [
    CommonModule,
  ]
})
export class DropdownModule {
}
