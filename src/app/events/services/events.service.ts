import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateEventInterface, EventInterface, EventStatus } from '../../event/models/event.interface';
import { ApiService } from '../../api.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { environment } from '../../../environments/environment';
import { SearchParamsInterface } from './events-search/search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private apiService: ApiService) {
  }

  getEvents(params?: SearchParamsInterface, orderBy?: string, statuses?: EventStatus[]): Observable<EventInterface[]> {
    return this.apiService.query({
      query: `
        query events($query: String, $location: String, $orderBy: String, $statuses: [Int], $tags: [String], $organizationId: ID) {
          events(query: $query, location: $location, orderBy: $orderBy, statuses: $statuses, tags: $tags, organizationId: $organizationId) {
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
                  organizationName
                }
                imagePath
                status
           }
        }`,
      variables: {
        ...params,
        orderBy,
        statuses
      }
    }).pipe(
      map(({data}) => data.events),
      map((events) => {
        return events.map(e => {
          if (e.imagePath) {
            e.imagePath = `${environment.apiRest}assets/images/${e.imagePath}`;
          }
          return e;
        });
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
           status
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
              organizationName
           }
           tags {
              _id
              label
           }
           activities {
              _id
              name
              description
              date {
                start
                end
              }
              volunteersNeeded
              participation {
                _id
                volunteer {
                  _id
                  firstName
                  lastName
                }
              }
              createdAt
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
        if (e.imagePath) {
          e.imagePath = `${environment.apiRest}assets/images/${e.imagePath}`;
        }
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
               status
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
        if (e.imagePath) {
          e.imagePath = `${environment.apiRest}assets/images/${e.imagePath}`;
        }
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
               status
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
            deleteEventTag(id: $id, tagId: $tagId)
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

  rewardVolunteers(eventId: string, achievements: any[], volunteerIds: string[]) {
    volunteerIds = Array.from(new Set(volunteerIds));
    return this.apiService.query({
      query: `
        mutation rewardVolunteers($eventId: ID!, $achievements: [AchievementInput!]!, $volunteerIds: [ID!]!) {
            rewardVolunteers(eventId: $eventId, achievements: $achievements, volunteerIds: $volunteerIds)
          }`
      ,
      variables: {
        eventId,
        achievements,
        volunteerIds
      }
    }).pipe(
      map(({data}) => data.rewardVolunteers)
    );
  }
}
