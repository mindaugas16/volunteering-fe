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
import { EventNewComponent } from '../event/event-new/event-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { ModalService } from '../core/services/modal/modal.service';
import { OrganizationEditComponent } from './organization-edit/organization-edit.component';

@NgModule({
  declarations: [
    OrganizationsListComponent,
    OrganizationInnerComponent,
    EventNewComponent,
    OrganizationEditComponent
  ],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    TranslateModule,
    InviteUserModalModule,
    EventModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    GenericModalModule
  ],
  entryComponents: [
    InviteUserModalComponent,
    EventNewComponent
  ]
})
export class OrganizationsModule {
}
