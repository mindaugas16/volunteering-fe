import { EventInterface } from '../event/models/event.interface';
import { OrganizationInterface } from '../organizations/organization.interface';

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
}

export interface CreateUserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  postalCode: string;
}

export interface UpdateUserInterface {
  firstName: string;
  lastName: string;
  postalCode?: string;
}
