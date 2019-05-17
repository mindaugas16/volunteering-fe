import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile-achievements',
  templateUrl: './profile-achievements.component.html',
  styleUrls: ['./profile-achievements.component.scss']
})
export class ProfileAchievementsComponent implements OnInit {
  user;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getAchievements().subscribe(user => {
      this.user = user;
    });
  }

}
