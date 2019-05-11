import { OrganizationInterface } from '../../organizations/organization.interface';
import { ActivityInterface, DateRangeInterface } from '../../activities/models/activity.interface';
import { Timestamp } from 'rxjs';
import { LocationInterface } from '../../shared/models/location.interface';
import { TagInterface } from '../../ui-elements/tag/tag.interface';

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  date: DateRangeInterface;
  creator: any;
  activities: ActivityInterface[];
  location: any;
  tags: TagInterface[];
  organization: OrganizationInterface;
  imagePath?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CreateEventInterface {
  title: string;
  description: string;
  date: DateRangeInterface;
  image?: File;
  location?: LocationInterface;
  imagePath?: string;
}
