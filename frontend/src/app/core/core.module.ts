import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SharedModule } from '../shared/shared.module';
import { SearchModule } from '../search/search.module';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalService } from './services/modal/modal.service';

@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    HomepageComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SearchModule,
    TranslateModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [
  ]
})
export class CoreModule {
}
