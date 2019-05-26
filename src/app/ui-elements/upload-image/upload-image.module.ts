import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UploadImageComponent],
  exports: [
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class UploadImageModule { }
