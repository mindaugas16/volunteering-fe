import { UserInterface } from '../auth/user.interface';
import { EventInterface } from '../event/models/event.interface';

export interface OrganizationInterface extends UserInterface {
  _id: string;
  name: string;
  description: string;
  creator: UserInterface;
  location: any;
  members: UserInterface[];
  events: EventInterface[];
}


export interface UpdateOrganizationInterface {
  name: string;
  location: any;
  description: string;
}
