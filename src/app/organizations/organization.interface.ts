import { UserInterface } from '../auth/user.interface';
import { EventInterface } from '../event/models/event.interface';
import { LocationInterface } from '../shared/models/location.interface';

export interface OrganizationInterface extends UserInterface {
  _id: string;
  organizationName: string;
  description: string;
  creator: UserInterface;
  location: LocationInterface;
  members: UserInterface[];
  events: EventInterface[];
}


export interface UpdateOrganizationInterface {
  name: string;
  location: LocationInterface;
  description: string;
}
