import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { TagModule } from '../tag/tag.module';

@NgModule({
  declarations: [TagsComponent],
  exports: [
    TagsComponent
  ],
  imports: [
    CommonModule,
    TagModule
  ]
})
export class TagsModule { }
