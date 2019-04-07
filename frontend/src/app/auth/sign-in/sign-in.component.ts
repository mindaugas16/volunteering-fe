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
    password: new FormControl(null, [Validators.required]),
    rememberMe: new FormControl(false)
  });
  loading: boolean;
  isInvalid: boolean;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.isInvalid = false);
  }

  submit() {
    this.loading = true;

    if (this.form.invalid) {
      this.loading = false;
      this.isInvalid = true;
      return;
    }
    const {email, password} = this.form.value;
    this.authService.signIn(email, password).subscribe(() => {
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.isInvalid = true;
      });
  }
}
