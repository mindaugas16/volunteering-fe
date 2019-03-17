import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  user: any;
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.authService.authenticatedObservable().subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.user = AuthService.getUser();
          console.log(this.user);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
