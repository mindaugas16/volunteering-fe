import { UserInterface } from '../../auth/user.interface';

export interface DateRangeInterface {
  start: Date | string;
  end: Date | string;
}

export interface ActivityInterface {
  eventId: string;
  name: string;
  description?: string;
  volunteersNeeded: number;
  date: DateRangeInterface;
  volunteers?: UserInterface[];
}
