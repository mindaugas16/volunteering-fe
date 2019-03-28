import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CreateUserInterface, UserInterface } from './user.interface';
import { ApiService } from '../api.service';

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.authenticated$.next(this.isAuthenticated());
  }

  static getToken() {
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) || null;
    return user ? user.token : null;
  }

  static getUser(): UserInterface {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)) || null;
  }

  signIn(email: string, password: string): Observable<any> {
    const setSession = authResponse => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(
        {
          'token': authResponse.login.token,
          // 'expiresAt': expiresAt.valueOf()
        }
      ));
      this.authenticated(true);
    };
    const body = {
      query: `
        query login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
           }
      `,
      variables: {
        email: email,
        password: password
      }
    };
    return this.apiService.query(body).pipe(
      map(({data}) => data),
      tap(res => {
        setSession(res);
        this.router.navigate(['/']);
      })
    );
  }

  signUp(form: CreateUserInterface) {
    return this.apiService.mutation({
      mutation: `
        mutation createUser($email: String!, $password: String!, $lastName: String!, $firstName: String!, $postalCode: String!) {
          createUser(userInput: {email: $email, password: $password, lastName: $lastName, firstName: $firstName, postalCode: $postalCode}) {
            email
            firstName
            lastName
            postalCode
          }
        }
      `,
      variables: form
    }).pipe(
      map(({data}) => data),
      tap(() => {
        this.router.navigate(['/auth/sign-in']);
      })
    );
  }

  getCurrentUser(): Observable<UserInterface> {
    const localUser = AuthService.getUser();
    if (localUser) {
      return new Observable(observer => {
        observer.next(localUser);
        observer.complete();
      });
    }

    return this.apiService.query({
      query: `
      query currentUser {
          currentUser {
              email
              firstName
              lastName
              postalCode
            }
           }
      `
    }).pipe(
      map(({data}) => data),
      map(({currentUser}) => currentUser),
      tap(user => {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      })
    );
  }

  private authenticated(authenticated: boolean) {
    this.authenticated$.next(authenticated);
  }

  authenticatedObservable(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  public logout() {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    this.authenticated(false);
    this.router.navigate(['/auth/sign-in']);
  }

  public isAuthenticated() {
    return !!AuthService.getToken();
  }
}
