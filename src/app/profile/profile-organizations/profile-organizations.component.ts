import { Component, Input, OnInit } from '@angular/core';
import { OrganizationInterface } from '../../organizations/organization.interface';

@Component({
  selector: 'app-profile-organizations',
  templateUrl: './profile-organizations.component.html',
  styleUrls: ['./profile-organizations.component.scss']
})
export class ProfileOrganizationsComponent implements OnInit {
  @Input() organization: OrganizationInterface[];

  constructor() {
  }

  ngOnInit() {
  }

}
