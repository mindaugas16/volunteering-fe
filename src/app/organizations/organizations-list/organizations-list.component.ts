import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {
  organizations: OrganizationInterface[] = [];

  constructor(
    private organizationService: OrganizationService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params => {
        return this.organizationService.getOrganizations(params);
      })
    ).subscribe(organizations => {
      this.organizations = organizations;
    });
  }

}
