import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'app-event-inner',
  templateUrl: './event-inner.component.html',
  styleUrls: ['./event-inner.component.scss']
})
export class EventInnerComponent implements OnInit {
  event: EventModel;

  constructor(private eventsService: EventsService
  ) {
  }

  ngOnInit() {
    this.eventsService.getEvent('5c8cd6ba73fe891b75e50155').subscribe(event => {
      this.event = event;
      console.log(this.event);
    });
  }

}
