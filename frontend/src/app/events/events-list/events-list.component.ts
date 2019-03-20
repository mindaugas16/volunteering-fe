import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: EventModel[];

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

}
