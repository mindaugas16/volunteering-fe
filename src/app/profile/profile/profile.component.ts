import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';
import { TabInterface } from '../../ui-elements/tabs/tab.interface';
import { UserRole } from '../user-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserInterface;
  tabs: TabInterface[] = [];
  selectedTab: TabInterface;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUserInfo().subscribe(user => {
      this.user = user;
      this.tabs = [
        {title: 'Profile', id: 0, icon: 'fa-user'},
        {title: 'Organizations', id: 1, icon: 'fa-star', isHidden: this.user && this.user.role === UserRole.ORGANIZATION},
        {title: 'Settings', icon: 'fa-gears', id: 2},
      ];
    });
  }
}
