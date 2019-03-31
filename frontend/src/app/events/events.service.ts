import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateEventInterface, EventInterface } from '../event/models/event.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private apiService: ApiService) {
  }

  getEvents(orderBy?: string): Observable<EventInterface[]> {
    return this.apiService.query({
      query: `
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

  getEvent(id: string): Observable<EventInterface> {
    return this.apiService.query({
      query: `
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
    return this.apiService.query({
      query: `
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