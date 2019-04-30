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
                date {
                  start
                  end
                }
                location {
                  title
                  address
                  address2
                  city
                  country
                  zipCode
                }
                creator {
                  firstName
                }
                tags
                organization {
                  name
                  _id
                }
                imagePath
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
           imagePath
           title
           description
           date {
              start
              end
            }
           location {
              title
              address
              address2
              city
              country
              zipCode
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
              volunteersNeeded
              volunteers
            }
            organization {
              _id
              name
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

  update(id: string, event: CreateEventInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation updateEvent($id: ID!, $title: String!, $description: String!, $date: DateRangeInput!,
        $imagePath: String, $locationInput: LocationInput) {
            updateEvent(id: $id, eventInput:
            {title: $title, description: $description, date: $date, imagePath: $imagePath, location: $locationInput}
            ) {
               _id
               title
               description
               date {
                start
                end
               }
               imagePath
               location {
                title
                address
                address2
                city
                country
                zipCode
               }
             }
          }`
      ,
      variables: {
        id,
        title: event.title,
        description: event.description,
        date: event.date,
        imagePath: event.imagePath,
        locationInput: event.location
      }
    }).pipe(
      map(({data}) => data),
      map(({updateEvent}) => updateEvent),
    );
  }

  createEvent(event: CreateEventInterface, organizationId: string): Observable<any> {
    return this.apiService.query({
      query: `
        mutation createEvent($title: String!, $description: String!, $date: DateRangeInput!, $organizationId: ID!, $imagePath: String) {
            createEvent(eventInput:
            {title: $title, description: $description, date: $date, organizationId: $organizationId, imagePath: $imagePath}
            ) {
               _id
               title
               description
               date {
                start
                end
               }
               imagePath
               location {
                title
                address
                address2
                city
                country
                zipCode
               }
             }
          }`
      ,
      variables: {
        title: event.title,
        description: event.description,
        date: event.date,
        organizationId,
        imagePath: event.imagePath
      }
    }).pipe(
      map(({data}) => data),
      map(({createEvent}) => createEvent),
    );
  }
}
