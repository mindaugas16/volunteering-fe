import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthHelper {

  constructor() {
  }

  static invalidateFormControls(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field) as FormControl;
      control.markAsDirty();
      control.setErrors({incorrect: true});
    });
  }
}
