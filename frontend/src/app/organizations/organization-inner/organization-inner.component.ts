import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { AuthService } from '../../auth/auth.service';
import { zip } from 'rxjs/internal/observable/zip';

@Component({
  selector: 'app-organization-inner',
  templateUrl: './organization-inner.component.html',
  styleUrls: ['./organization-inner.component.scss']
})
export class OrganizationInnerComponent implements OnInit {
  organization: OrganizationInterface;
  isUserJoinedOrganization: boolean;

  constructor(
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return zip(this.organizationService.getOrganization(params['id']), this.authService.getCurrentUser());
      })
    ).subscribe(([organization, user]) => {
      this.organization = organization;
      this.isUserJoinedOrganization = !!this.organization.members.find(member => member._id === user._id);
    });
  }

  toggleOrganizationJoin() {
    if (this.isUserJoinedOrganization) {
      this.organizationService.leaveOrganization(this.organization._id).subscribe(() => {
        this.isUserJoinedOrganization = false;
      });
      return;
    }
    this.organizationService.joinOrganization(this.organization._id).subscribe(() => {
      this.isUserJoinedOrganization = true;
    });
  }
}
