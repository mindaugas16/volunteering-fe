import { Injectable } from '@angular/core';
import { DateRangeInterface } from '../../../activities/models/activity.interface';

@Injectable({
  providedIn: 'root'
})
export class DateFormatHelper {

  constructor() {
  }

  static changeDateFormat(startDate: Date, endDate: Date): DateRangeInterface {
    return {
      start: startDate,
      end: endDate || startDate,
    };
  }
}
