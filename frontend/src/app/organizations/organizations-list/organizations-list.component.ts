import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization.service';
import { OrganizationInterface } from '../organization.interface';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationsListComponent implements OnInit {
  organizations: OrganizationInterface[] = [];

  constructor(
    private organizationService: OrganizationService
  ) {
  }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe(organizations => {
      this.organizations = organizations;
    });
  }

}
