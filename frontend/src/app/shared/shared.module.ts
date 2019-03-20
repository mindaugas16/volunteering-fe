import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './directives/dropdown/dropdown.directive';
import { DropdownToggleDirective } from './directives/dropdown/dropdown-toggle.directive';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelDirective } from './components/input/directives/input-label.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    DropdownToggleDirective,
    InputComponent,
    InputLabelDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    DropdownDirective,
    DropdownToggleDirective,
    InputComponent,
    InputLabelDirective
  ]
})
export class SharedModule { }
