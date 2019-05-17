import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';

@Component({
  selector: 'app-profile-organizations',
  templateUrl: './profile-organizations.component.html',
  styleUrls: ['./profile-organizations.component.scss']
})
export class ProfileOrganizationsComponent implements OnInit {
  user: UserInterface;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUserInfo().subscribe(user => this.user = user);
  }

}
