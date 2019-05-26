import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';

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

  constructor(private authService: AuthService,
              private modalService: NgbModal
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
    this.authService.signIn(this.form.value).subscribe(() => {
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.isInvalid = true;
      });
  }

  onForgotPassword() {
    const modalRef = this.modalService.open(ForgotPasswordModalComponent, {windowClass: 'modal is-active'});
    // modalRef.componentInstance.userType = id;
  }
}
