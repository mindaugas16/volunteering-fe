import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';

@Component({
  selector: 'app-profile-achievements',
  templateUrl: './profile-achievements.component.html',
  styleUrls: ['./profile-achievements.component.scss']
})
export class ProfileAchievementsComponent implements OnInit {
  user: UserInterface;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getAchievements().subscribe(user => {
      this.user = user;
      this.user.achievements.map(a => a.points = this.getPoints());
    });
  }


  getPoints(): number {
    return Math.floor(Math.random() * 20) + 1;
  }
}
