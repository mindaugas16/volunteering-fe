import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const {email, password} = this.form.value;
    this.authService.signIn(email, password).subscribe(() => {
      },
      err => {
        Object.keys(this.form.controls).forEach(field => {
          const control = this.form.get(field);
          control.setErrors({incorrect: true});
        });
      });
  }

  isInvalid(formControlName: string) {
    const formControl = this.form.get(formControlName);
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

}
