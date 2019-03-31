import { UserInterface } from '../auth/user.interface';
import { EventInterface } from '../event/models/event.interface';

export interface OrganizationInterface {
  _id: string;
  name: string;
  creator: UserInterface;
  location: any;
  members: UserInterface[];
  events: EventInterface[];
}
