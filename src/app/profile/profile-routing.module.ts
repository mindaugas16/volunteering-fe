import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MyOrganizationComponent } from './my-organization/my-organization.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileOrganizationsComponent } from './profile-organizations/profile-organizations.component';
import { EditProfileFormComponent } from './edit-profile-form/edit-profile-form.component';
import { ProfileAchievementsComponent } from './profile-achievements/profile-achievements.component';
import { ParticipationComponent } from './participation/participation.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'edit',
        component: EditProfileFormComponent,
      },
      {
        path: 'my-organization',
        component: MyOrganizationComponent,
      },
      {
        path: 'settings',
        component: ProfileSettingsComponent,
      },
      {
        path: 'organizations',
        component: ProfileOrganizationsComponent,
      },
      {
        path: 'achievements',
        component: ProfileAchievementsComponent,
      },
      {
        path: 'participation',
        component: ParticipationComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
