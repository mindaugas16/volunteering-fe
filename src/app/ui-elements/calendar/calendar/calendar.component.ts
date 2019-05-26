import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarDateFormatter, CalendarEvent, CalendarView } from 'angular-calendar';
import { TranslateService } from '@ngx-translate/core';
import { CustomDateFormat } from '../custom-date-format.provider';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormat
    }
  ]
})
export class CalendarComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() viewDate: Date = new Date();
  @Output() eventClick: EventEmitter<any> = new EventEmitter();
  view: CalendarView = CalendarView.Month;
  calendarView = CalendarView;
  locale: string;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit() {
    this.locale = this.translateService.currentLang || this.translateService.defaultLang;
    this.translateService.onLangChange.subscribe(({lang}) => {
      this.locale = lang;
    });
  }

  onEvent(event) {
    this.eventClick.emit(event);
  }
}
