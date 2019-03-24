import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventModel } from '../../event/models/event.model';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: EventModel[];
  sortItems: { label: string, value: string }[] = [
    {label: 'Date', value: 'date'},
    {label: 'Title', value: 'title'},
    {label: 'Created', value: 'createdAt'},
    {label: 'Updated', value: 'updatedAt'},
  ];

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.fetch();
  }

  onSortChange(orderBy) {
    this.fetch(orderBy);
  }

  fetch(orderBy?: string) {
    this.eventsService.getEvents(orderBy).subscribe(events => {
      this.events = events;
    });
  }
}
