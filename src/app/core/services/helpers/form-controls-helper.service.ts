import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormControlsHelperService {

  constructor() {
  }

  static invalidateFormControls(form: FormGroup, key = 'incorrect') {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field) as FormControl;
      control.markAsDirty();
    });
  }

  static invalidateSingleFormControl(control: AbstractControl, key = 'incorrect') {
    control.markAsDirty();
    control.setErrors({[key]: true});
  }

  static invalidateControlsByErrors(form: FormGroup, errors: { [key: string]: string }[]) {
    errors.forEach(value => {
      const key = Object.keys(value)[0];
      FormControlsHelperService.invalidateSingleFormControl(form.get(key), value[key]);
    });
  }
}
