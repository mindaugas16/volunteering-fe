import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [BreadcrumbComponent],
  exports: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BreadcrumbModule { }
