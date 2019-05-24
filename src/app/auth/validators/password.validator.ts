import { FormControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {

  public static strong(control: FormControl): ValidationResult {
    // if (control.value) {
    //   const length = control.value.length > 7;
    //   const hasNumber = /\d/.test(control.value);
    //   const hasUpper = /[A-Z]/.test(control.value);
    //   const hasLower = /[a-z]/.test(control.value);
    //   if (!(length && hasNumber && hasUpper && hasLower)) {
    //     return {strong: true};
    //   }
    // }
    return null;
  }
}
