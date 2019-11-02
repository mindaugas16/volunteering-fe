import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api.service';
import { TagInterface } from '../../ui-elements/tag/tag.interface';
import { CreateEventInterface, EventInterface } from '../event/models/event.interface';
import { SearchParamsInterface } from './events-search/search-params.interface';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor(private apiService: ApiService) {}

  getEvents(params?: SearchParamsInterface, orderBy?: string): Observable<any> {
    return this.apiService.get('events', params);
  }

  getEvent(id: string): Observable<EventInterface> {
    return this.apiService.get(`events/${id}`);
  }

  update(id: string, event: CreateEventInterface): Observable<any> {
    return this.apiService.patch(`events/${id}/edit`, event);
  }

  createEvent(event: CreateEventInterface): Observable<EventInterface> {
    return this.apiService.post(`events/create`, event);
  }

  addTags(id: string, { label }: TagInterface): Observable<any> {
    return this.apiService
      .query({
        query: `
        mutation addEventTag($id: ID!, $tagLabel: String!) {
            addEventTag(id: $id, tagLabel: $tagLabel) {
               _id
               label
             }
          }`,
        variables: {
          id,
          tagLabel: label
        }
      })
      .pipe(map(({ data }) => data.addEventTag));
  }

  updateTag(id: string, tag: TagInterface): Observable<any> {
    return this.apiService
      .query({
        query: `
        mutation updateEventTag($id: ID!, $tag: TagUpdateInput!) {
            updateEventTag(id: $id, tag: $tag) {
               _id
               label
             }
          }`,
        variables: {
          id,
          tag
        }
      })
      .pipe(map(({ data }) => data.updateEventTag));
  }

  deleteTag(id: string, tagId: string): Observable<any> {
    return this.apiService
      .query({
        query: `
        mutation deleteEventTag($id: ID!, $tagId: ID!) {
            deleteEventTag(id: $id, tagId: $tagId)
          }`,
        variables: {
          id,
          tagId
        }
      })
      .pipe(map(({ data }) => data.deleteEventTag));
  }

  rewardVolunteers(eventId: string, achievements: any[], volunteerIds: string[]) {
    volunteerIds = Array.from(new Set(volunteerIds));
    return this.apiService
      .query({
        query: `
        mutation rewardVolunteers($eventId: ID!, $achievements: [AchievementInput!]!, $volunteerIds: [ID!]!) {
            rewardVolunteers(eventId: $eventId, achievements: $achievements, volunteerIds: $volunteerIds)
          }`,
        variables: {
          eventId,
          achievements,
          volunteerIds
        }
      })
      .pipe(map(({ data }) => data.rewardVolunteers));
  }
}
