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
  sortItems: { label: string, value: string }[] = [
    {label: 'Date', value: 'date'},
    {label: 'Name', value: 'name'},
    {label: 'Popularity', value: 'popularity'},
  ];

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  onSortChange(sort) {
    console.log(sort);
  }
}
