import { Component, ContentChild, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputLabelDirective } from './directives/input-label.directive';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @ContentChild(InputLabelDirective, {read: TemplateRef}) inputLabel;

  @Input() type = 'text';
  @Input() label: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() formControl: FormControl;

  // The internal data model
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  isInvalid() {
    return this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: () => any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => any) {
    this.onTouchedCallback = fn;
  }
}