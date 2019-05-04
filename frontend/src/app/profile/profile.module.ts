import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormMessageModule } from '../ui-elements/form-message/form-message.module';

@NgModule({
  declarations: [ProfileComponent, EditProfileFormComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    FormMessageModule
  ]
})
export class ProfileModule { }
