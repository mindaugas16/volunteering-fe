import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventInnerComponent } from './event-inner/event-inner.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: EventInnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}
