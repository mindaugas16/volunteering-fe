import { UserInterface } from '../../auth/user.interface';

export interface DateRangeInterface {
  start: Date | string;
  end: Date | string;
}

export interface ActivityInterface {
  _id: string;
  eventId: string;
  name: string;
  description?: string;
  volunteersNeeded: number;
  date: DateRangeInterface;
  volunteers?: UserInterface[];
  createdAt: string;
  updatedAt: string;
}

export interface ActivityCreateInterface {
  eventId: string;
  name: string;
  description?: string;
  volunteersNeeded: number;
  date: DateRangeInterface;
  volunteers?: UserInterface[];
}
