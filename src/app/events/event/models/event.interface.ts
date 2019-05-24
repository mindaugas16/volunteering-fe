import { OrganizationInterface } from '../../../organizations/organization.interface';
import { ActivityInterface, DateRangeInterface } from '../../../activities/models/activity.interface';
import { LocationInterface } from '../../../shared/models/location.interface';
import { TagInterface } from '../../../ui-elements/tag/tag.interface';
import { CustomFieldInterface } from '../../../ui-elements/custom-field/custom-field.interface';

export interface EventInterface {
  _id: string;
  title: string;
  description: string;
  date: DateRangeInterface;
  creator: any;
  activities: ActivityInterface[];
  location: LocationInterface;
  tags: TagInterface[];
  organization: OrganizationInterface;
  imagePath?: string;
  createdAt: string;
  updatedAt: string;
  status: EventStatus;
  customFields: CustomFieldInterface[];
}

export interface CreateEventInterface {
  title: string;
  description: string;
  date: DateRangeInterface;
  image?: File;
  location?: LocationInterface;
  imagePath?: string;
  status: string;
  customFields?: CustomFieldInterface[];
}

export enum EventStatus {
  DRAFT,
  PUBLIC,
  PRIVATE
}
