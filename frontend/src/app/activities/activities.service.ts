import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivityInterface } from './models/activity.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private apiService: ApiService) {
  }

  createActivity(activityInput: ActivityInterface): Observable<ActivityInterface> {
    return this.apiService.query({
      query: `
       mutation createActivity($activityInput: ActivityInput!) {
          createActivity(activityInput: $activityInput) {
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
      map(({data}) => data),
      map(({createActivity}) => createActivity)
    );
  }
}
