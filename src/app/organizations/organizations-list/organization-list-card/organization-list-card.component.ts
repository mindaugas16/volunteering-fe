import { Component, Input, OnInit } from '@angular/core';
import { ActionsRules } from '../../../shared/permissions.config';
import { ImagePathFormatterService } from '../../../core/services/helpers/image-path-formatter.service';
import { OrganizationInterface } from '../../organization.interface';

@Component({
  selector: 'app-organization-list-card',
  templateUrl: './organization-list-card.component.html',
  styleUrls: ['./organization-list-card.component.scss']
})
export class OrganizationListCardComponent implements OnInit {
  @Input() organization: OrganizationInterface;
  actionsRules = ActionsRules;

  constructor() {
  }

  ngOnInit() {
    this.organization.organizationLogo = ImagePathFormatterService.format(this.organization.organizationLogo);
  }

}
