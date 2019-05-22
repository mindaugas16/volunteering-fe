import { Injectable } from '@angular/core';
import { DateRangeInterface } from '../../../activities/models/activity.interface';
import { AbstractLabelInterface } from '../../../ui-elements/abstract-label/abstract-label/abstract-label.component';

@Injectable({
  providedIn: 'root'
})
export class EventDateStatusHelper {

  constructor() {
  }

  getEventStatusByDate(date: DateRangeInterface): AbstractLabelInterface {
    const convertDate = (datePart?) => {
      if (!datePart) {
        return new Date().setHours(0, 0, 0, 0);
      }
      return new Date(datePart).setHours(0, 0, 0, 0);
    };

    if (convertDate(date.start) > convertDate()) {
      return {
        extraClass: 'is-info',
        name: 'Soon',
        status: 0
      };
    } else if (convertDate(date.start) <= convertDate() && convertDate() <= convertDate(date.end)) {
      return {
        extraClass: 'is-primary',
        name: 'Happening',
        status: 1
      };
    } else if (convertDate() > convertDate(date.end)) {
      return {
        extraClass: 'is-success',
        name: 'Finished',
        status: 2
      };
    }
  }
}
