import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { UserInterface } from '../../../auth/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>(observer => {
      this
        .authService
        .getCurrentUser()
        .subscribe((user: UserInterface) => {
          observer.next((!route.data.allowedRoles) ||
            (user && route.data.allowedRoles && route.data.allowedRoles.indexOf(user.role) > -1));
          observer.complete();
        });
    });
  }
}
