import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CreateUserInterface, UserInterface } from './user.interface';
import { ApiService } from '../api.service';
import { UserRole } from '../profile/user-type.enum';

const LOCAL_STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.authenticated$.next(this.isAuthenticated());
  }

  static getToken() {
    let storage = null;
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      storage = localStorage;
    } else if (sessionStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
      storage = sessionStorage;
    } else {
      return null;
    }
    const user = JSON.parse(storage.getItem(LOCAL_STORAGE_TOKEN_KEY)) || null;
    return user ? user.token : null;
  }

  static getUser(): UserInterface {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY)) || null;
  }

  signIn({email, password, rememberMe}): Observable<any> {
    let storage = sessionStorage;
    if (rememberMe) {
      storage = localStorage;
    }

    const setSession = authResponse => {
      storage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(
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

  signUp(user: CreateUserInterface, userRole: UserRole) {
    return this.apiService.query({
      query: `
        mutation createUser($userInput: UserInput!, $userRole: UserRole!) {
          createUser(userInput: $userInput, userRole: $userRole) {
            email
            firstName
            lastName
            postalCode
          }
        }
      `,
      variables: {
        userInput: user,
        userRole
      }
    }).pipe(
      map(({data}) => data),
      tap(() => {
        this.router.navigate(['/auth/sign-in']);
      })
    );
  }

  registerOrganization(user: CreateUserInterface, organization) {
    return this.apiService.query({
      query: `
        mutation registerOrganization($organizationInput: OrganizationInput!, $userInput: UserInput!) {
          registerOrganization(organizationInput: $organizationInput, userInput: $userInput) {
            email
            firstName
            lastName
            name
          }
        }
      `,
      variables: {
        organizationInput: organization,
        userInput: user
      }
    }).pipe(
      map(({data}) => data),
      map(({registerOrganization}) => registerOrganization),
    );
  }

  getCurrentUser(fetch = true): Observable<UserInterface> {
    const localUser = AuthService.getUser();
    if (localUser) {
      return new Observable(observer => {
        observer.next(localUser);
        observer.complete();
      });
    }

    if (!fetch) {
      return of(null);
    }

    return this.apiService.query({
      query: `
      query currentUser {
          currentUser {
              _id
              email
              firstName
              lastName
              postalCode
              role
            }
           }
      `
    }).pipe(
      map(({data}) => data.currentUser),
      tap(user => {
        if (user) {
          let storage = sessionStorage;
          if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
            storage = localStorage;
          }
          storage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
        } else {
          this.logout();
        }
      })
    );
  }

  requestResetToken(email: string): Observable<boolean> {
    return this.apiService.query({
      query: `
      mutation getResetToken($email: String!) {
          getResetToken(email: $email)
           }
      `,
      variables: {
        email
      }
    }).pipe(
      map(({data}) => data.getResetToken)
    );
  }

  resetPassword(token: string, password: string): Observable<boolean> {
    return this.apiService.query({
      query: `
      mutation resetPassword($token: String!, $password: String!) {
          resetPassword(token: $token, password: $password)
           }
      `,
      variables: {
        token,
        password
      }
    }).pipe(
      map(({data}) => data.resetPassword)
    );
  }

  private authenticated(authenticated: boolean) {
    this.authenticated$.next(authenticated);
  }

  authenticatedObservable(): Observable<boolean> {
    return this.authenticated$.asObservable();
  }

  public logout() {
    if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
    if (sessionStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || sessionStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
      sessionStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      sessionStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
    this.authenticated(false);
    this.router.navigate(['/auth/sign-in']);
  }

  public isAuthenticated() {
    return !!AuthService.getToken();
  }
}
