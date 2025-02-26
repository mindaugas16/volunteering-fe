import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateEventInterface, EventInterface, EventsResponseInterface, EventStatus } from '../event/models/event.interface';
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

  getEvents(params?: SearchParamsInterface, orderBy?: string, statuses?: EventStatus[]): Observable<EventsResponseInterface> {
    return this.apiService.query({
      query: `
        query events($query: String, $location: String, $orderBy: String,
         $statuses: [Int], $tags: [String], $organizationIds: [ID], $page: Int) {
          events(query: $query, location: $location, orderBy: $orderBy,
          statuses: $statuses, tags: $tags, organizationIds: $organizationIds, page: $page) {
                totalCount
                events {
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
           }
        }`,
      variables: {
        ...params,
        orderBy,
        statuses
      }
    }).pipe(
      map(({data}) => data.events)
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
           customFields {
              id
              title
              value
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
      map(({data}) => data.event)
    );
  }

  update(id: string, event: CreateEventInterface): Observable<any> {
    return this.apiService.query({
      query: `
        mutation updateEvent($id: ID!, $eventInput: EventInput!) {
            updateEvent(id: $id, eventInput: $eventInput) {
               _id
             }
          }`
      ,
      variables: {
        id,
        eventInput: event
      }
    }).pipe(
      map(({data}) => data.updateEvent)
    );
  }

  createEvent(event: CreateEventInterface): Observable<EventInterface> {
    return this.apiService.query({
      query: `
        mutation createEvent($eventInput: EventInput!) {
            createEvent(eventInput: $eventInput) {
               _id
               customFields {
                title
                value
               }
             }
          }`
      ,
      variables: {
        eventInput: event
      }
    }).pipe(
      map(({data}) => data.createEvent)
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
      map(({data}) => data.addEventTag)
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
      map(({data}) => data.updateEventTag)
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
      map(({data}) => data.deleteEventTag)
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
