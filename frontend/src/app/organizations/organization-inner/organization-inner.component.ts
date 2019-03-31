import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';

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
    private organizationService: OrganizationService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.organizationService.getOrganization(params['id']);
      })
    ).subscribe(organization => {
      this.organization = organization;
      // const user = AuthService.getUser();
      // if (user) {
      //   this.isUserJoinedOrganization = !!user.organizations.find(o => o._id === this.organization._id);
      // }
    });
  }

  toggleOrganizationJoin() {
    let observable = this.organizationService.joinOrganization(this.organization._id);
    if (this.isUserJoinedOrganization) {
      observable = this.organizationService.leaveOrganization(this.organization._id);
    }
    observable.subscribe();
  }
}
