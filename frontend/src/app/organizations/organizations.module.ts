import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationInnerComponent } from './organization-inner/organization-inner.component';
import { TranslateModule } from '@ngx-translate/core';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { EventModule } from '../event/event.module';

@NgModule({
  declarations: [OrganizationsListComponent, OrganizationInnerComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    TranslateModule,
    GenericModalModule,
    EventModule
  ]
})
export class OrganizationsModule {
}
