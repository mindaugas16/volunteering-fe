import { OrganizationInterface } from '../../organizations/organization.interface';
import { ActivityInterface, DateRangeInterface } from '../../activities/models/activity.interface';
import { Timestamp } from 'rxjs';
import { LocationInterface } from '../../shared/models/location.interface';

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  date: DateRangeInterface;
  creator: any;
  activities: ActivityInterface[];
  location: any;
  tags: any[];
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
  location?: LocationInterface;
  imagePath?: string;
}
