import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContentDirective } from './directives/modal-content/modal-content.directive';
import { ModalFooterDirective } from './directives/modal-footer/modal-footer.directive';
import { ModalHeaderDirective } from './directives/modal-header/modal-header.directive';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    GenericModalComponent,
    ModalContentDirective,
    ModalFooterDirective,
    ModalHeaderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GenericModalComponent,
    ModalContentDirective,
    ModalFooterDirective,
    ModalHeaderDirective
  ],
  providers: [
    NgbActiveModal
  ],
  entryComponents: [
    GenericModalComponent
  ]
})
export class GenericModalModule {
}
