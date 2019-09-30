import { Component, OnInit } from '@angular/core';
import { EventInterface, EventStatus } from '../event/models/event.interface';
import { EventsService } from '../services/events.service';
import { EventsSearchService } from '../services/events-search/events-search.service';
import { switchMap, take } from 'rxjs/operators';
import { TagsService } from '../../ui-elements/tags/tags.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: EventInterface[] = [];
  sortItems: { label: string; value: string }[] = [
    {label: 'Date', value: 'date'},
    {label: 'Title', value: 'title'},
    {label: 'Created', value: 'createdAt'},
    {label: 'Updated', value: 'updatedAt'}
  ];
  totalCount: number;
  totalPages: number;
  loading: boolean;

  constructor(
    private eventsService: EventsService,
    private eventsSearchService: EventsSearchService,
    private tagsService: TagsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        switchMap(queryParams => {
          this.loading = true;
          const {page, tags, organizations, query} = queryParams;
          let params = new HttpParams().append('page', page || 1);

          if (tags) {
            params = params.append('tags', tags);
          }

          if (organizations) {
            params = params.append('organizations', organizations);
          }

          if (query) {
            params = params.append('query', query);
          }

          return this.eventsService.getEvents(
            params,
            null,
            [
              EventStatus.PUBLIC
            ]);
        })
      )
      .subscribe(({data, meta}) => {
          this.totalCount = meta.totalCount;
          this.totalPages = meta.totalPages;
          this.events = data;
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }
}
