import { UserInterface } from '../../auth/user.interface';
import { ActivityInterface } from '../../activities/models/activity.interface';

export interface ParticipationInterface {
  volunteer: UserInterface;
  activity: ActivityInterface;
  additionalInformation: string;
}
