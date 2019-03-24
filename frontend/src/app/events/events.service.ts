import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateEventInterface, EventModel } from '../event/models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private apollo: Apollo) {
  }

  getEvents(orderBy?: string): Observable<EventModel[]> {
    return this.apollo.query({
      query: gql`
        query events($orderBy: String) {
          events(orderBy: $orderBy) {
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
        }`,
      variables: {
        orderBy: orderBy
      }
    }).pipe(
      map(({data}) => data),
      map(({events}) => events),
    );
  }

  getEvent(id: string): Observable<EventModel> {
    return this.apollo.query({
      query: gql`
      query event($eventId: ID!) {
          event(eventId: $eventId) {
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
           activities {
            name
            description
            date {
              start
              end
            }
           }
           }
        }`
      ,
      variables: {
        eventId: id
      }
    }).pipe(
      map(({data}) => data),
      map(({event}) => event),
    );
  }

  createEvent(event: CreateEventInterface): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
      mutation createEvent($title: String!, $description: String!, $date: String!) {
          createEvent(eventInput: {title: $title, description: $description, date: $date}) {
           _id
           title
           }
        }`
      ,
      variables: {
        title: event.title,
        description: event.description,
        date: event.date,
      }
    });
  }
}
