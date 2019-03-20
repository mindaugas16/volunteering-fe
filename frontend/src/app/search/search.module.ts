import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SearchPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SearchPanelComponent
  ]
})
export class SearchModule {
}
