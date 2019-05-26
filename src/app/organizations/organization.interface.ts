import { UserInterface } from '../auth/user.interface';
import { EventInterface } from '../events/event/models/event.interface';
import { LocationInterface } from '../shared/models/location.interface';

export interface OrganizationInterface extends UserInterface {
  _id: string;
  organizationName: string;
  description: string;
  creator: UserInterface;
  location: LocationInterface;
  members: UserInterface[];
  events: EventInterface[];
  organizationLogo?: string;
  organizationWebsite?: string;
}

export interface OrganizationsResultsInterface {
  organizations: OrganizationInterface[];
  totalCount: number;
}


export interface UpdateOrganizationInterface {
  organizationName: string;
  location: LocationInterface;
  description: string;
  organizationLogo?: string;
  organizationWebsite?: string;
}
