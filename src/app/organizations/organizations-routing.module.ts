import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationInnerComponent } from './organization-inner/organization-inner.component';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsListComponent
  },
  {
    path: 'details/:id',
    component: OrganizationInnerComponent
  },
  {
    path: 'details/:id/edit',
    component: OrganizationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
