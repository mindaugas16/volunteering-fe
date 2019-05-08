import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [TagComponent],
  exports: [
    TagComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClickOutsideModule
  ]
})
export class TagModule { }
