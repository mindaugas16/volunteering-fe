import { EventInterface } from '../events/event/models/event.interface';
import { OrganizationInterface } from '../organizations/organization.interface';
import { UserRole } from '../profile/user-type.enum';

export interface UserInterface {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  password: string;
  organizations: OrganizationInterface[];
  createdEvents: EventInterface[];
  createdActivities: any[];
  role: UserRole;
  achievements: any[];
}

export interface CreateUserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;

  organizationName: string;
}

export interface UpdateUserInterface {
  firstName: string;
  lastName: string;
  postalCode?: string;
}
