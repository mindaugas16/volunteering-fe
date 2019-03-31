import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { EventModule } from '../../event/event.module';

@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    EventModule
  ],
  exports: [
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ]
})
export class ModalModule {
}
