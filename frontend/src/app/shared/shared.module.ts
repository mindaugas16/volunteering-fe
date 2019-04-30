import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputLabelDirective } from './components/input/directives/input-label.directive';
import { CutSentencePipe } from './pipes/cut-sentence/cut-sentence.pipe';
import { SortComponent } from './components/sort/sort.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation/click-stop-propagation.directive';
import { DropdownModule } from '../ui-elements/dropdown/dropdown.module';
import { StickyDirective } from './directives/sticky/sticky.directive';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    InputComponent,
    InputLabelDirective,
    CutSentencePipe,
    SortComponent,
    ClickStopPropagationDirective,
    StickyDirective,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ],
  exports: [
    InputComponent,
    InputLabelDirective,
    CutSentencePipe,
    SortComponent,
    ClickStopPropagationDirective,
    StickyDirective,
    LogoComponent
  ]
})
export class SharedModule {
}
