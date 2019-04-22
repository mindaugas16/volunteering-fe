import { OrganizationInterface } from '../../organizations/organization.interface';
import { ActivityInterface, DateRangeInterface } from '../../activities/models/activity.interface';
import { Timestamp } from 'rxjs';

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  date: DateRangeInterface;
  creator: any;
  activities: ActivityInterface[];
  location: any;
  tags: string[];
  organization: OrganizationInterface;
  imagePath?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateEventInterface {
  title: string;
  description: string;
  date: string;
  image?: File;
  location?: any;
  imagePath?: string;
}
