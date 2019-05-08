import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteUserModalComponent } from './invite-user-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericModalModule } from '../generic-modal/generic-modal.module';

@NgModule({
  declarations: [
    InviteUserModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    GenericModalModule
  ],
  exports: [
    InviteUserModalComponent
  ]
})
export class InviteUserModalModule {
}
