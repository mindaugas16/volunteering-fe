import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelDirective } from './components/input/directives/input-label.directive';
import { CutSentencePipe } from './pipes/cut-sentence/cut-sentence.pipe';
import { SortComponent } from './components/sort/sort.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation/click-stop-propagation.directive';
import { DropdownModule } from '../ui-elements/dropdown/dropdown.module';
import { LogoComponent } from './components/logo/logo.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HasPermissionDirective } from './directives/has-permission/has-permission.directive';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InputComponent,
    InputLabelDirective,
    CutSentencePipe,
    SortComponent,
    ClickStopPropagationDirective,
    LogoComponent,
    LoaderComponent,
    HasPermissionDirective,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    GenericModalModule,
  ],
  exports: [
    InputComponent,
    InputLabelDirective,
    CutSentencePipe,
    SortComponent,
    ClickStopPropagationDirective,
    LogoComponent,
    LoaderComponent,
    HasPermissionDirective,
    ConfirmModalComponent
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class SharedModule {
}
