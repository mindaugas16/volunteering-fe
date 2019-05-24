import { EventInterface } from '../events/event/models/event.interface';
import { OrganizationInterface } from '../organizations/organization.interface';
import { UserRole } from '../profile/user-type.enum';

export const ActionsRules = {
  IS_VOLUNTEER: function (): boolean {
    return this.user && this.user.role === UserRole.VOLUNTEER;
  },
  IS_ORGANIZATION: function (): boolean {
    return this.user && this.user.role === UserRole.ORGANIZATION;
  },
  EDIT_EVENT_DETAILS: function (event: EventInterface): boolean {
    if (!(event && event.organization && this.user)) {
      return false;
    }
    return event.organization._id === this.user._id;
  },
  EDIT_ORGANIZATION_DETAILS: function (organization: EventInterface): boolean {
    if (!(organization && this.user)) {
      return false;
    }
    return organization._id === this.user._id;
  },
  JOIN_ORGANIZATION: function (organization: OrganizationInterface): boolean {
    if (!(organization && this.user)) {
      return false;
    }
    return organization._id !== this.user._id;
  },
  JOIN_EVENT: function (): boolean {
    return ActionsRules.IS_VOLUNTEER.call(this);
  }
};
