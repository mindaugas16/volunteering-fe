import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContentDirective } from './modal-content.directive';
import { ModalService } from '../../core/services/modal/modal.service';

@NgModule({
  declarations: [
    GenericModalComponent,
    ModalContentDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    GenericModalComponent,
    ModalContentDirective
  ],
  entryComponents: [
    GenericModalComponent
  ],
  providers: [
    ModalService
  ]
})
export class GenericModalModule {
}
