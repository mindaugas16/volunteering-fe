import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationEditModalComponent } from './organization-edit-modal/organization-edit-modal.component';
import { OrganizationEditFormComponent } from './organization-edit-form/organization-edit-form.component';
import { GenericModalModule } from '../../ui-elements/generic-modal/generic-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { UploadImageModule } from '../../ui-elements/upload-image/upload-image.module';

@NgModule({
  declarations: [OrganizationEditModalComponent, OrganizationEditFormComponent],
  imports: [
    CommonModule,
    GenericModalModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild(),
    UploadImageModule
  ],
  exports: [
    OrganizationEditFormComponent
  ],
  entryComponents: [OrganizationEditModalComponent]
})
export class OrganizationEditModule {
}
