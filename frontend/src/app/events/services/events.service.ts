import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateEventInterface, EventInterface, UpdateEventInterface } from '../../event/models/event.interface';
import { ApiService } from '../../api.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';

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
                creator {
                  _id
                  firstName
                }
                organization {
                  name
                  _id
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
            _id
            firstName
           }
           tags {
            _id
            label
           }
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

  update(id: string, event: UpdateEventInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation updateEvent($id: ID!, $title: String!, $description: String!, $date: DateRangeInput!,
        $imagePath: String, $locationInput: LocationInput, $tagsInput: [TagInput]) {
            updateEvent(id: $id, eventInput:
            {title: $title, description: $description, date: $date, imagePath: $imagePath, location: $locationInput, tags: $tagsInput}
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
               tags {
                _id
                label
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
