import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { EventInterface, EventStatus } from '../../event/models/event.interface';
import { EventsSearchService } from '../services/events-search/events-search.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  events: EventInterface[];
  loading: boolean;
  sortItems: { label: string, value: string }[] = [
    {label: 'Date', value: 'date'},
    {label: 'Title', value: 'title'},
    {label: 'Created', value: 'createdAt'},
    {label: 'Updated', value: 'updatedAt'},
  ];

  constructor(private eventsService: EventsService,
              private eventsSearchService: EventsSearchService
  ) {
  }

  ngOnInit() {
    this.eventsSearchService.getSearchQueryAsObservable().pipe(
      switchMap(query => {
        this.loading = true;
        return this.eventsService.getEvents(query, null, [EventStatus.PUBLIC]);
      })
    ).subscribe(events => {
      this.events = events;
      this.loading = false;
    }, () => this.loading = false);
  }

  onSortChange(orderBy) {
    this.fetch(orderBy);
  }

  fetch(orderBy?: string) {
    this.eventsService.getEvents(null, orderBy).subscribe(events => {
      this.events = events;
    });
  }
}
