import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../ui-elements/dropdown/dropdown.module';
import { GenericModalModule } from '../ui-elements/generic-modal/generic-modal.module';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { GenericListWrapperComponent } from './components/generic-list-wrapper/generic-list-wrapper.component';
import { InputButtonDirective } from './components/input/directives/input-button.directive';
import { InputLabelDirective } from './components/input/directives/input-label.directive';
import { InputComponent } from './components/input/input.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { SortComponent } from './components/sort/sort.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation/click-stop-propagation.directive';
import { HasPermissionDirective } from './directives/has-permission/has-permission.directive';
import { CutSentencePipe } from './pipes/cut-sentence/cut-sentence.pipe';
import { ImagePathPipe } from './pipes/image-path/image-path.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';

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
    ImagePathPipe
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, DropdownModule, GenericModalModule],
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
    ImagePathPipe
  ],
  entryComponents: [ConfirmModalComponent]
})
export class SharedModule {}
