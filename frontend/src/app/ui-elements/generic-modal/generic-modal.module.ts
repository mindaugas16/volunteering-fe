import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericModalComponent } from './generic-modal/generic-modal.component';
import { EventNewComponent } from '../../event/event-new/event-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalContentDirective } from './modal-content.directive';

@NgModule({
  declarations: [
    GenericModalComponent,
    EventNewComponent,
    ModalContentDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GenericModalComponent
  ],
  entryComponents: [
    GenericModalComponent,
    EventNewComponent
  ]
})
export class GenericModalModule {
}
