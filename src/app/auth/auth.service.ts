import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CreateUserInterface, UserInterface } from './user.interface';
import { ApiService } from '../api.service';
import { UserRole } from '../profile/user-type.enum';
import { HeaderMessageService } from '../ui-elements/header-message/header-message.service';

const STORAGE_TOKEN_KEY = 'token';
const LOCAL_STORAGE_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private headerMessage: HeaderMessageService
  ) {
    this.authenticated$.next(this.isAuthenticated());
  }

  static getToken() {
    const storage = AuthService.getUsedBrowserStorage();
    const user = storage ? (JSON.parse(AuthService.getUsedBrowserStorage().getItem(STORAGE_TOKEN_KEY)) || null) : null;
    return user ? user.token : null;
  }

  static getUser(): UserInterface {
    const storage = AuthService.getUsedBrowserStorage();
    return storage ? (JSON.parse(storage.getItem(LOCAL_STORAGE_USER_KEY)) || null) : null;
  }

  static getUsedBrowserStorage() {
    if (localStorage.getItem(STORAGE_TOKEN_KEY)) {
      return localStorage;
    } else if (sessionStorage.getItem(STORAGE_TOKEN_KEY)) {
      return sessionStorage;
    }
    return null;
  }

  static updateStorage(user: UserInterface) {
    const storage = AuthService.getUsedBrowserStorage();
    storage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  }

  signIn({email, password, rememberMe}): Observable<any> {
    let storage = sessionStorage;
    if (rememberMe) {
      storage = localStorage;
    }

    const setSession = ({token}) => {
      storage.setItem(STORAGE_TOKEN_KEY, JSON.stringify(
        {
          'token': token,
          // 'expiresAt': expiresAt.valueOf()
        }
      ));
      this.authenticated(true);
    };
    const body = {email, password};
    return this.apiService.post('auth/login', body).pipe(
      tap(res => {
        setSession(res);
      })
    );
  }

  signUp(user: CreateUserInterface, userRole: UserRole) {
    return this.apiService.post('auth/sign-up', {...user, userRole}).pipe(
      tap(() => {
        this.router.navigate(['/auth/sign-in']);
        this.headerMessage.show('Congratulations! You have successfully registered', 'SUCCESS');
      })
    );
  }

  getCurrentUser(fetch = true): Observable<UserInterface> {
    if (!this.isAuthenticated()) {
      return of(null);
    }

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

    return this.apiService.get('users/current').pipe(
      tap(user => {
        if (user) {
          let storage = sessionStorage;
          if (localStorage.getItem(STORAGE_TOKEN_KEY)) {
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
    if (localStorage.getItem(STORAGE_TOKEN_KEY) || localStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
    if (sessionStorage.getItem(STORAGE_TOKEN_KEY) || sessionStorage.getItem(LOCAL_STORAGE_USER_KEY)) {
      sessionStorage.removeItem(STORAGE_TOKEN_KEY);
      sessionStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
    this.authenticated(false);
    this.router.navigate(['/auth/sign-in']);
  }

  public isAuthenticated() {
    return !!AuthService.getToken();
  }

  deleteAccount() {
    return this.apiService.query({
      query: `
      mutation deleteUser {
          deleteUser
           }
      `
    }).pipe(
      map(({data}) => data.deleteUser)
    );
  }
}
