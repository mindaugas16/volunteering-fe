import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthHelper } from '../helpers/auth.helper';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false)
  });

  constructor(private authService: AuthService,
              private authHelper: AuthHelper) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      this.authHelper.invalidateFormControls(this.form);
      return;
    }
    const {email, password} = this.form.value;
    this.authService.signIn(email, password).subscribe(() => {
      },
      err => {
        this.authHelper.invalidateFormControls(this.form);
      });
  }

  isInvalid(formControlName: string) {
    const formControl = this.form.get(formControlName);
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

}
