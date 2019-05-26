import { UserInterface } from '../../auth/user.interface';
import { ParticipationInterface } from '../../shared/models/participation.interface';
import { EventInterface } from '../../events/event/models/event.interface';

export interface DateRangeInterface {
  start: Date | string;
  end: Date | string;
}

export interface ActivityInterface {
  _id: string;
  event: EventInterface;
  name: string;
  description?: string;
  volunteersNeeded: number;
  date: DateRangeInterface;
  participation?: ParticipationInterface[];
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
