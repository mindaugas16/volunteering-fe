import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventModel } from './models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private apollo: Apollo) {
  }

  getEvents(): Observable<EventModel[]> {
    return this.apollo.query({
      query: gql`
        query events {
          events {
                _id
                title
                description
                date
                location {
                  address
                  city
                  country
                }
                creator {
                  firstName
                }
                tags
           }
        }`
    }).pipe(
      map(({data}) => data),
      map(({events}) => events),
    );
  }
}
