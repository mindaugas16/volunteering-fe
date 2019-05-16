import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateUserInterface, UserInterface } from '../auth/user.interface';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';

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
            }
           }
      `
    }).pipe(
      map(({data}) => data),
      map(({currentUser}) => currentUser)
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
}
