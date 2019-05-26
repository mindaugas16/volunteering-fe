import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';
import { TabInterface } from '../../ui-elements/tabs/tab.interface';
import { UserRole } from '../user-type.enum';

enum ProfileTabsEnum {
  PROFILE,
  MY_ORGANIZATION,
  ORGANIZATIONS,
  SETTINGS,
  ACHIEVEMENTS,
  PARTICIPATION
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserInterface;
  tabs: TabInterface[] = [];

  constructor(private profileService: ProfileService
  ) {
  }

  ngOnInit() {
    const visibleOnlyForVolunteer = () => [UserRole.ORGANIZATION, UserRole.SPONSOR].indexOf(this.user.role) > -1;
    this.profileService.getUserInfo().subscribe(user => {
      this.user = user;
      this.tabs = [
        {title: 'Profile', id: ProfileTabsEnum.PROFILE, icon: 'fa-user', link: ['edit']},
        {
          title: 'My organization',
          id: ProfileTabsEnum.MY_ORGANIZATION,
          icon: 'fa-star',
          isHidden: this.user && this.user.role !== UserRole.ORGANIZATION,
          link: ['my-organization']
        },
        {
          title: 'Organizations',
          id: ProfileTabsEnum.ORGANIZATIONS,
          icon: 'fa-star',
          isHidden: this.user && visibleOnlyForVolunteer(),
          link: ['organizations']
        },
        {
          title: 'Achievements',
          icon: 'fa-trophy',
          id: ProfileTabsEnum.ACHIEVEMENTS,
          link: ['achievements'],
          isHidden: this.user && visibleOnlyForVolunteer(),
        },
        {
          title: 'Participation',
          icon: 'fa-calendar',
          id: ProfileTabsEnum.PARTICIPATION,
          link: ['participation'],
          isHidden: this.user && visibleOnlyForVolunteer(),
        },
      ];
    });
  }
}
