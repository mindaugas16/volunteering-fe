import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationInnerComponent } from './organization-inner/organization-inner.component';
import { TranslateModule } from '@ngx-translate/core';
import { EventModule } from '../event/event.module';
import { SharedModule } from '../shared/shared.module';
import { InviteUserModalModule } from '../ui-elements/invite-user-modal/invite-user-modal.module';
import { InviteUserModalComponent } from '../ui-elements/invite-user-modal/invite-user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';
import { BreadcrumbModule } from '../ui-elements/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationInnerComponent,
    OrganizationEditComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    TranslateModule,
    InviteUserModalModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    GenericModalModule,
    EventModule,
    BreadcrumbModule
  ],
  entryComponents: [
    InviteUserModalComponent,
    OrganizationEditComponent
  ]
})
export class OrganizationsModule {
}
