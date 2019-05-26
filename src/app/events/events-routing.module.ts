import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventInnerComponent } from './event/event-inner/event-inner.component';
import { UserRole } from '../profile/user-type.enum';
import { RoleGuard } from '../core/guards/role/role.guard';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'new',
    component: EventEditComponent,
    data: {
      allowedRoles: [
        UserRole.ORGANIZATION
      ]
    },
    canActivate: [RoleGuard]
  },
  {
    path: 'details/:id',
    component: EventInnerComponent
  },
  {
    path: 'details/:id/activities',
    loadChildren: '../activities/activities.module#ActivitiesModule',
    data: {
      allowedRoles: [
        UserRole.ORGANIZATION
      ]
    },
    canActivate: [RoleGuard]
  },
  {
    path: 'details/:id/edit',
    component: EventEditComponent,
    data: {
      allowedRoles: [
        UserRole.ORGANIZATION
      ]
    },
    canActivate: [RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
