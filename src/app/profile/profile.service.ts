import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UpdateUserInterface, UserInterface } from '../auth/user.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { ParticipationInterface } from '../shared/models/participation.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService, private authService: AuthService) {
  }

  getUserInfo(): Observable<UserInterface> {
    return this.apiService.get('users/current').pipe(
      catchError(err => {
        this.authService.logout();
        return of(err);
      })
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

  updateUserInfo(body: UpdateUserInterface): Observable<UserInterface> {
    return this.apiService.patch('users/update', body).pipe(
      tap(user => {
        AuthService.updateStorage(user);
      })
    );
  }

  changePassword(passwords): Observable<boolean> {
    return this.apiService.query({
      query: `
      mutation changePassword($oldPassword: String!, $newPassword: String!, $repeatPassword: String!) {
          changePassword(oldPassword: $oldPassword, newPassword: $newPassword, repeatPassword: $repeatPassword)
           }
      `,
      variables: {
        ...passwords
      }
    }).pipe(
      map(({data}) => data.changePassword)
    );
  }
}
