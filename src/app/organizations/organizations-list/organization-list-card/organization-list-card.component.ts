import { Component, Input } from '@angular/core';
import { ActionsRules } from '../../../shared/permissions.config';
import { OrganizationInterface } from '../../organization.interface';

@Component({
  selector: 'app-organization-list-card',
  templateUrl: './organization-list-card.component.html',
  styleUrls: ['./organization-list-card.component.scss']
})
export class OrganizationListCardComponent {
  @Input() organization: OrganizationInterface;
  actionsRules = ActionsRules;

  constructor() {}
}
