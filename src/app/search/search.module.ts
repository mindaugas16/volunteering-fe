import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchPanelComponent
  ]
})
export class SearchModule {
}
