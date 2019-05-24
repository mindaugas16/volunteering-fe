import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { EventEditComponent } from './event-edit/event-edit.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'details/:id',
    loadChildren: './event/event.module#EventModule'
  },
  {
    path: 'new',
    component: EventEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
