import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventInnerComponent } from './event-inner/event-inner.component';
import { EventNewComponent } from './event-new/event-new.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: EventInnerComponent
  },
  {
    path: 'new',
    component: EventNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {
}