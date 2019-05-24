import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { SignUpVolunteerFormComponent } from './sign-up/sign-up-volunteer-form/sign-up-volunteer-form.component';
import { SignUpOrganizationFormComponent } from './sign-up/sign-up-organization-form/sign-up-organization-form.component';
import { SignUpSponsorFormComponent } from './sign-up/sign-up-sponsor-form/sign-up-sponsor-form.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignUpVolunteerFormComponent,
    SignUpOrganizationFormComponent,
    SignUpSponsorFormComponent,
    ForgotPasswordModalComponent,
    ResetPasswordComponent,
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
    SignUpVolunteerFormComponent,
    SignUpOrganizationFormComponent,
    SignUpSponsorFormComponent
  ],
  entryComponents: [
    SignUpVolunteerFormComponent,
    SignUpOrganizationFormComponent,
    SignUpSponsorFormComponent,
    ForgotPasswordModalComponent
  ]
})
export class AuthModule {
}
