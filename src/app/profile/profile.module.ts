import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormMessageModule } from '../ui-elements/form-message/form-message.module';
import { TabsModule } from '../ui-elements/tabs/tabs.module';
import { MyOrganizationComponent } from './my-organization/my-organization.component';
import { AuthModule } from '../auth/auth.module';
import { OrganizationEditModule } from '../organizations/organization-edit/organization-edit.module';
import { EventsModule } from '../events/events.module';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileOrganizationsComponent } from './profile-organizations/profile-organizations.component';
import { ProfileAchievementsComponent } from './profile-achievements/profile-achievements.component';
import { ParticipationComponent } from './participation/participation.component';
import { CalendarModule } from '../ui-elements/calendar/calendar.module';
import { EventEditComponent } from '../events/event-edit/event-edit.component';
import { PaginationModule } from '../ui-elements/pagination/pagination.module';

@NgModule({
  declarations: [
    ProfileComponent,
    EditProfileFormComponent,
    MyOrganizationComponent,
    ProfileSettingsComponent,
    ProfileOrganizationsComponent,
    ProfileAchievementsComponent,
    ParticipationComponent
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
  ],
  entryComponents: [
    EventEditComponent
  ]
})
export class ProfileModule {
}
