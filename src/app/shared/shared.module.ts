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
import { KeysPipe } from './pipes/keys/keys.pipe';
import { InputButtonDirective } from './components/input/directives/input-button.directive';
import { GenericListWrapperComponent } from './components/generic-list-wrapper/generic-list-wrapper.component';

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
    KeysPipe,
    InputButtonDirective,
    GenericListWrapperComponent,
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
    ConfirmModalComponent,
    KeysPipe,
    InputButtonDirective,
    GenericListWrapperComponent,
  ],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class SharedModule {
}
