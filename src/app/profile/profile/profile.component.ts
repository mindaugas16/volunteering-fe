import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';
import { TabInterface } from '../../ui-elements/tabs/tab.interface';
import { UserRole } from '../user-type.enum';

enum ProfileTabsEnum {
  PROFILE,
  MY_ORGANIZATION,
  ORGANIZATIONS,
  SETTINGS
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
    this.profileService.getUserInfo().subscribe(user => {
      this.user = user;
      this.tabs = [
        {title: 'Profile', id: ProfileTabsEnum.PROFILE, icon: 'fa-user', link: ['edit']},
        {
          title: 'My organization',
          id: ProfileTabsEnum.MY_ORGANIZATION,
          icon: 'fa-star',
          isHidden: this.user && this.user.role !== UserRole.ORGANIZATION, link: ['my-organization']
        },
        {
          title: 'Organizations',
          id: ProfileTabsEnum.ORGANIZATIONS,
          icon: 'fa-star',
          isHidden: this.user && this.user.role === UserRole.ORGANIZATION,
          link: ['organizations']
        },
        {title: 'Settings', icon: 'fa-gears', id: ProfileTabsEnum.SETTINGS, link: ['settings']},
      ];
    });
  }
}
