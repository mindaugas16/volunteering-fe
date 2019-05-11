import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateEventInterface, EventInterface } from '../../event/models/event.interface';
import { ApiService } from '../../api.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private apiService: ApiService) {
  }

  getEvents(query?: string, orderBy?: string): Observable<EventInterface[]> {
    return this.apiService.query({
      query: `
        query events($query: String, $orderBy: String) {
          events(query: $query, orderBy: $orderBy) {
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
                organization {
                  _id
                  name
                }
                imagePath
           }
        }`,
      variables: {
        query,
        orderBy
      }
    }).pipe(
      map(({data}) => data),
      map(({events}) => events),
      map((e) => {
        e.imagePath = `${environment.apiRest}assets/images/${e.imagePath}`;
        return e;
      })
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
           organization {
              _id
              name
           }
           tags {
              _id
              label
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
      map((e) => {
        e.imagePath = `${environment.apiRest}assets/images/${e.imagePath}`;
        return e;
      })
    );
  }

  update(id: string, event: CreateEventInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation updateEvent($id: ID!, $eventInput: EventInput!) {
            updateEvent(id: $id, eventInput: $eventInput) {
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
        eventInput: event
      }
    }).pipe(
      map(({data}) => data),
      map(({updateEvent}) => updateEvent),
      map((e) => {
        e.imagePath = `${environment.apiRest}assets/images/${e.imagePath}`;
        return e;
      })
    );
  }

  createEvent(event: CreateEventInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation createEvent($eventInput: EventInput!) {
            createEvent(eventInput: $eventInput) {
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
        eventInput: event
      }
    }).pipe(
      map(({data}) => data),
      map(({createEvent}) => createEvent),
    );
  }

  addTags(id: string, {label}: TagInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation addEventTag($id: ID!, $tagLabel: String!) {
            addEventTag(id: $id, tagLabel: $tagLabel) {
               _id
               label
             }
          }`
      ,
      variables: {
        id,
        tagLabel: label
      }
    }).pipe(
      map(({data}) => data),
      map(({addEventTag}) => addEventTag),
    );
  }

  updateTag(id: string, tag: TagInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation updateEventTag($id: ID!, $tag: TagUpdateInput!) {
            updateEventTag(id: $id, tag: $tag) {
               _id
               label
             }
          }`
      ,
      variables: {
        id,
        tag
      }
    }).pipe(
      map(({data}) => data),
      map(({updateEventTag}) => updateEventTag),
    );
  }

  deleteTag(id: string, tagId: string): Observable<any> {
    return this.apiService.query({
      query: `
        mutation deleteEventTag($id: ID!, $tagId: ID!) {
            deleteEventTag(id: $id, tagId: $tagId) {
               _id
               label
             }
          }`
      ,
      variables: {
        id,
        tagId
      }
    }).pipe(
      map(({data}) => data),
      map(({deleteEventTag}) => deleteEventTag),
    );
  }
}
