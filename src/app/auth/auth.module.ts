import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { SignUpOrganizationFormComponent } from './sign-up/sign-up-organization-form/sign-up-organization-form.component';
import { SignUpSponsorFormComponent } from './sign-up/sign-up-sponsor-form/sign-up-sponsor-form.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GeneralSignUpFormComponent } from './sign-up/general-sign-up-form/general-sign-up-form.component';
import { TermsModalComponent } from './terms-modal/terms-modal.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    SignUpOrganizationFormComponent,
    SignUpSponsorFormComponent,
    ForgotPasswordModalComponent,
    ResetPasswordComponent,
    GeneralSignUpFormComponent,
    TermsModalComponent,
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
    SignUpOrganizationFormComponent,
    SignUpSponsorFormComponent
  ],
  entryComponents: [
    SignUpOrganizationFormComponent,
    SignUpSponsorFormComponent,
    ForgotPasswordModalComponent,
    TermsModalComponent
  ]
})
export class AuthModule {
}
