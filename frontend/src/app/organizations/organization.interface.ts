import { UserInterface } from '../auth/user.interface';

export interface OrganizationInterface {
  _id: string;
  name: string;
  creator: UserInterface;
  location: any;
}
