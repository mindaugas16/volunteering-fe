import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalSearchRoutingModule } from './global-search-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    GlobalSearchRoutingModule
  ]
})
export class GlobalSearchModule { }
