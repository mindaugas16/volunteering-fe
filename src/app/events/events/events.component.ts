import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventInterface, EventStatus } from '../event/models/event.interface';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: EventInterface[] = [];
  sortItems: { label: string; value: string }[] = [
    { label: 'Date', value: 'date' },
    { label: 'Title', value: 'title' },
    { label: 'Created', value: 'createdAt' },
    { label: 'Updated', value: 'updatedAt' }
  ];
  totalCount: number;
  totalPages: number;
  loading: boolean;

  constructor(private eventsService: EventsService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(queryParams => {
          this.loading = true;
          const { page, tags, organizations, query } = queryParams;
          let params = new HttpParams()
            .append('page', page || 1)
            .append('statuses', [EventStatus.PUBLIC].toString());

          if (tags) {
            params = params.append('tags', tags);
          }

          if (organizations) {
            params = params.append('organizations', organizations);
          }

          if (query) {
            params = params.append('query', query);
          }

          return this.eventsService.getEvents(params);
        })
      )
      .subscribe(
        ({ data, meta }) => {
          this.totalCount = meta.totalCount;
          this.totalPages = meta.totalPages;
          this.events = data;
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }
}
