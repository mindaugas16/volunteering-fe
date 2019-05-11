import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContentDirective } from './directives/modal-content/modal-content.directive';
import { ModalFooterDirective } from './directives/modal-footer/modal-footer.directive';

@NgModule({
  declarations: [
    GenericModalComponent,
    ModalContentDirective,
    ModalFooterDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GenericModalComponent,
    ModalContentDirective,
    ModalFooterDirective
  ],
  entryComponents: [
    GenericModalComponent
  ]
})
export class GenericModalModule {
}
