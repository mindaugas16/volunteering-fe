import { OrganizationInterface } from '../../organizations/organization.interface';
import { ActivityInterface } from '../../activities/models/activity.interface';

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  date: string;
  creator: any;
  activities: ActivityInterface[];
  location: any;
  tags: string[];
  organization: OrganizationInterface;
}

export interface CreateEventInterface {
  title: string;
  description: string;
  date: string;
  image?: File;
  location?: any;
}
