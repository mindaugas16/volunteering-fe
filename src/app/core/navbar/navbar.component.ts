import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { UserInterface } from '../../auth/user.interface';
import { ActionsRules } from '../../shared/permissions.config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  user: UserInterface;
  isAuthenticated: boolean;
  actionsRules = ActionsRules;
  isActiveMenu: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription.add(
      this.router.events.pipe(
        filter(() => this.isActiveMenu)
      ).subscribe(() => this.isActiveMenu = false)
    );

    this.subscription.add(
      this.authService.authenticatedObservable().pipe(
        switchMap(isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
          if (this.isAuthenticated) {
            return this.authService.getCurrentUser();
          }
          return of(null);
        })
      ).subscribe(user => this.user = user)
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
