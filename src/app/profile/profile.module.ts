import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { EventEditComponent } from '../events/event-edit/event-edit.component';
import { EventsModule } from '../events/events.module';
import { OrganizationEditModule } from '../organizations/organization-edit/organization-edit.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from '../ui-elements/calendar/calendar.module';
import { FormMessageModule } from '../ui-elements/form-message/form-message.module';
import { PaginationModule } from '../ui-elements/pagination/pagination.module';
import { TabsModule } from '../ui-elements/tabs/tabs.module';
import { GenericModalModule } from './../ui-elements/generic-modal/generic-modal.module';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { MyOrganizationComponent } from './my-organization/my-organization.component';
import { ParticipationComponent } from './participation/participation.component';
import { ProfileAchievementsComponent } from './profile-achievements/profile-achievements.component';
import { ProfileOrganizationsComponent } from './profile-organizations/profile-organizations.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { EditProfilePhotoModalComponent } from './profile/edit-profile-photo-modal/edit-profile-photo-modal.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileFormComponent,
    MyOrganizationComponent,
    ProfileSettingsComponent,
    ProfileOrganizationsComponent,
    ProfileAchievementsComponent,
    ParticipationComponent,
    EditProfilePhotoModalComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    FormMessageModule,
    TabsModule,
    AuthModule,
    OrganizationEditModule,
    EventsModule,
    CalendarModule,
    PaginationModule,
    GenericModalModule
  ],
  entryComponents: [EventEditComponent, EditProfilePhotoModalComponent]
})
export class ProfileModule {}
