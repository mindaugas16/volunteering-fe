import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserInterface;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUserInfo().subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

}
