import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserInterface } from '../../auth/user.interface';
import { UserService } from '../../core/services/user/user.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { OrganizationInterface } from '../../organizations/organization.interface';

@Component({
  selector: 'app-profile-organizations',
  templateUrl: './profile-organizations.component.html',
  styleUrls: ['./profile-organizations.component.scss']
})
export class ProfileOrganizationsComponent implements OnInit {
  loading = true;
  organizations: OrganizationInterface[];

  constructor(private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getCurrentUser().pipe(
      switchMap(({_id}) => {
        return this.userService.getUserOrganizations(_id);
      })
    ).subscribe(organizations => {
      this.organizations = organizations;
      this.loading = false;
    }, (error => this.loading = false));
  }

}
