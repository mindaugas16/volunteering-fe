import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationInnerComponent } from './organization-inner/organization-inner.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { InviteUserModalModule } from '../ui-elements/invite-user-modal/invite-user-modal.module';
import { InviteUserModalComponent } from '../ui-elements/invite-user-modal/invite-user-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { BreadcrumbModule } from '../ui-elements/breadcrumb/breadcrumb.module';
import { EventStatusLabelModule } from '../ui-elements/event-status-label/event-status-label.module';
import { OrganizationEditModule } from './organization-edit/organization-edit.module';
import { EventsModule } from '../events/events.module';
import { PaginationModule } from '../ui-elements/pagination/pagination.module';
import { OrganizationListCardComponent } from './organizations-list/organization-list-card/organization-list-card.component';
import { OrganizationSearchPanelComponent } from './organization-search-panel/organization-search-panel.component';

@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationInnerComponent,
    OrganizationListCardComponent,
    OrganizationSearchPanelComponent,
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
    EventsModule,
    BreadcrumbModule,
    EventStatusLabelModule,
    OrganizationEditModule,
    PaginationModule
  ],
  entryComponents: [
    InviteUserModalComponent,
  ]
})
export class OrganizationsModule {
}
