import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/guards/auth/auth.guard';
import { HomepageComponent } from './core/homepage/homepage.component';
import { UserGuard } from './auth/guards/user/user.guard';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'profile',
    canActivate: [UserGuard],
    loadChildren: './profile/profile.module#ProfileModule'
  },
  {
    path: 'events',
    loadChildren: './events/events.module#EventsModule'
  },
  {
    path: 'event',
    loadChildren: './event/event.module#EventModule'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
