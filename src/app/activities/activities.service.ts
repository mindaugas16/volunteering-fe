import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivityCreateInterface, ActivityInterface } from './models/activity.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private apiService: ApiService) {
  }

  create(activityInput: ActivityCreateInterface): Observable<ActivityInterface> {
    return this.apiService.query({
      query: `
       mutation createActivity($activityInput: ActivityInput!) {
          createActivity(activityInput: $activityInput) {
            _id
            name
            description
            date {
              start
              end
            }
            volunteersNeeded
          }
        }
        `,
      variables: {
        activityInput
      }
    }).pipe(
      map(({data}) => data.createActivity)
    );
  }

  update(id: string, activityInput: ActivityCreateInterface): Observable<ActivityInterface> {
    return this.apiService.query({
      query: `
       mutation updateActivity($id: ID!, $activityInput: ActivityInput!) {
          updateActivity(id: $id, activityInput: $activityInput) {
            _id
            name
            description
            date {
              start
              end
            }
            volunteersNeeded
            volunteers {
              firstName
            }
          }
        }
        `,
      variables: {
        id,
        activityInput
      }
    }).pipe(
      map(({data}) => data.updateActivity)
    );
  }

  register(activityId: string) {
    return this.apiService.query({
      query: `
       mutation registerToActivity($activityId: ID!) {
          registerToActivity(activityId: $activityId) {
              _id
              volunteer {
                _id
              }
          }
        }
        `,
      variables: {
        activityId
      }
    }).pipe(
      map(({data}) => data.registerToActivity)
    );
  }

  delete(id: string): Observable<boolean> {
    return this.apiService.query({
      query: `
        mutation deleteActivity($id: ID!) {
          deleteActivity(id: $id)
        }
      `,
      variables: {
        id,
      }
    }).pipe(
      map(({data}) => data.deleteActivity)
    );
  }

  deleteParticipation(activityId: string): Observable<boolean> {
    return this.apiService.query({
      query: `
        mutation deleteParticipation($activityId: ID!) {
          deleteParticipation(activityId: $activityId)
        }
      `,
      variables: {
        activityId
      }
    }).pipe(
      map(({data}) => data.deleteParticipation)
    );
  }
}
