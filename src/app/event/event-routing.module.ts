import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventInnerComponent } from './event-inner/event-inner.component';

const routes: Routes = [
  {
    path: '',
    component: EventInnerComponent
  },
  {
    path: 'activities',
    loadChildren: '../activities/activities.module#ActivitiesModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
