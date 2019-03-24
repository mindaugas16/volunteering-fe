import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './events-list/events-list.component';
import { EventInnerComponent } from './event-inner/event-inner.component';

const routes: Routes = [
  {
    path: '',
    component: EventsListComponent
  },
  {
    path: ':id',
    component: EventInnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
