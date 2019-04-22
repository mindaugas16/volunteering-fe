import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeInterface } from '../../../activities/models/activity.interface';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  @ViewChild('dp') dp;
  @Input() dateRange: DateRangeInterface;

  @Output() dateSelect: EventEmitter<DateRangeInterface> = new EventEmitter();

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(public calendar: NgbCalendar) {
  }

  ngOnInit() {
    if (this.dateRange) {
      this.fromDate = this.fromModel(new Date(this.dateRange.start));
      this.toDate = this.fromModel(new Date(this.dateRange.end));
      this.dp.navigateTo(this.fromDate);
    }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    const dateRange: DateRangeInterface = {
      start: this.toModel(this.fromDate),
      end: this.toModel(this.toDate),
    };
    this.dateSelect.emit(dateRange);
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  private fromModel(date: Date): NgbDate {
    return date ? new NgbDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    ) : null;
  }

  private toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}
