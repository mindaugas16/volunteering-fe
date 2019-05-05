import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignUpFormComponent } from './sign-up/sign-up-form/sign-up-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignUpFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule,
    GenericModalModule
  ],
  exports: [
    SignUpFormComponent
  ],
  entryComponents: [
    SignUpFormComponent
  ]
})
export class AuthModule {
}
