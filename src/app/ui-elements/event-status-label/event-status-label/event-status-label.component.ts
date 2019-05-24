import { Component, Input, OnChanges } from '@angular/core';
import { EventStatus } from '../../../events/event/models/event.interface';

@Component({
  selector: 'app-event-status-label',
  templateUrl: './event-status-label.component.html',
  styleUrls: ['./event-status-label.component.scss']
})
export class EventStatusLabelComponent implements OnChanges {
  @Input() status: EventStatus;
  statusObject: { extraClass?: string, name: string };

  constructor() {
  }

  ngOnChanges() {
    this.statusObject = this.generateStatusObject();
  }

  private generateStatusObject() {
    switch (this.status) {
      case EventStatus.DRAFT:
        return {name: 'Draft'};
      case EventStatus.PRIVATE:
        return {name: 'Private', extraClass: 'is-link'};
      case EventStatus.PUBLIC:
        return {name: 'Public', extraClass: 'is-success'};
    }
  }

}
