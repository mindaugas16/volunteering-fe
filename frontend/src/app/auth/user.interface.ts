import { EventInterface } from '../event/models/event.interface';

export interface UserInterface {
  email: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  password: string;
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
