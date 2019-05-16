import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationInnerComponent } from './organization-inner/organization-inner.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsListComponent
  },
  {
    path: 'details/:id',
    component: OrganizationInnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {
}
