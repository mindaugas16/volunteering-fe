import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventInterface } from '../../event/models/event.interface';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: EventInterface[];
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
