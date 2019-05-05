import { EventInterface } from '../event/models/event.interface';
import { OrganizationInterface } from '../organizations/organization.interface';

export const EDIT_ORGANIZATION_DETAILS = 'EDIT_ORGANIZATION_DETAILS';

export const PermissionActions = {
  EDIT_ORGANIZATION_DETAILS,
};

export const ActionsRules = {
  EDIT_EVENT_DETAILS: function(event: EventInterface): boolean {
    return event.creator._id === this.user._id;
  },
  EDIT_ORGANIZATION_DETAILS: function(organization: EventInterface): boolean {
    return organization.creator._id === this.user._id;
  },
  JOIN_ORGANIZATION: function(organization: OrganizationInterface): boolean {
    return organization.creator._id !== this.user._id;
  }
};
