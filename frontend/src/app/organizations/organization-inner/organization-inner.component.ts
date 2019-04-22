import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { AuthService } from '../../auth/auth.service';
import { zip } from 'rxjs/internal/observable/zip';
import { UserInterface } from '../../auth/user.interface';

@Component({
  selector: 'app-organization-inner',
  templateUrl: './organization-inner.component.html',
  styleUrls: ['./organization-inner.component.scss']
})
export class OrganizationInnerComponent implements OnInit {
  organization: OrganizationInterface;
  isUserJoinedOrganization: boolean;
  isOwner: boolean;
  isMember: boolean;
  user: UserInterface;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return zip(this.organizationService.getOrganization(params['id']), this.authService.getCurrentUser());
      })
    ).subscribe(([organization, user]) => {
      this.organization = organization;
      if (user) {
        this.isUserJoinedOrganization = !!this.organization.members.find(member => member._id === user._id);
        this.isOwner = this.organization.creator._id === user._id;
        this.isMember = !!this.organization.members.find(member => member._id === user._id);
        this.user = user;
      }
    });
  }

  toggleOrganizationJoin() {
    if (!this.user) {
      this.router.navigate(['/auth']);
      return;
    }

    if (this.isUserJoinedOrganization) {
      this.organizationService.leaveOrganization(this.organization._id).subscribe(() => {
        this.isUserJoinedOrganization = false;
        this.organization.members.splice(this.organization.members.findIndex(member => member._id === this.user._id), 1);
      });
      return;
    }
    this.organizationService.joinOrganization(this.organization._id).subscribe(() => {
      this.isUserJoinedOrganization = true;
      this.organization.members.push(this.user);
    });
  }

  onEventAdd() {
  }

  onUserInvite() {
  }
}
