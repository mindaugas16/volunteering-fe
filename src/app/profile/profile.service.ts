import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserInterface, UserInterface } from '../auth/user.interface';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ParticipationInterface } from '../shared/models/participation.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) {
  }

  getUserInfo(): Observable<UserInterface> {
    return this.apiService.query({
      query: `
      query currentUser {
          currentUser {
              _id
              email
              firstName
              lastName
              postalCode
              contacts
              role
              organizations {
                name
                _id
              }
            }
           }
      `
    }).pipe(
      map(({data}) => data),
      map(({currentUser}) => currentUser)
    );
  }

  getAchievements(): Observable<any> {
    return this.apiService.query({
      query: `
      query getVolunteer {
          getVolunteer {
              firstName
              achievements {
                label
                icon
                _id
                value
              }
            }
           }
      `
    }).pipe(
      map(({data}) => data.getVolunteer)
    );
  }

  updateUserInfo(user: UpdateUserInterface): Observable<UserInterface> {
    return this.apiService.query({
      query: `
      mutation updateUserInfo($userInput: UserUpdateInput) {
          updateUserInfo(userInput: $userInput) {
              firstName
              lastName
              postalCode
            }
           }
      `,
      variables: {
        userInput: user
      }
    }).pipe(
      map(({data}) => data),
      map(({updateUserInfo}) => updateUserInfo)
    );
  }

  getUserParticipation(): Observable<ParticipationInterface[]> {
    return this.apiService.query({
      query: `
        query participation {
          participation {
            activity {
              _id
              name
              date {
                start
                end
              }
              event {
                _id
                title
              }
            }
          }
        }
      `
    }).pipe(
      map(({data}) => data.participation),
    );
  }
}
