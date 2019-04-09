import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventInnerComponent } from './event-inner/event-inner.component';
import { EventEditComponent } from './event-edit/event-edit.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: EventInnerComponent
  },
  {
    path: 'details/:id/edit',
    component: EventEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
