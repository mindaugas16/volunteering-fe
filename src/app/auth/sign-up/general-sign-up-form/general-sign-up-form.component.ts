import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserRole } from '../../../profile/user-type.enum';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermsModalComponent } from '../../terms-modal/terms-modal.component';

@Component({
  selector: 'app-general-sign-up-form',
  templateUrl: './general-sign-up-form.component.html',
  styleUrls: ['./general-sign-up-form.component.scss']
})
export class GeneralSignUpFormComponent implements OnInit {
  @Input() userType: UserRole;
  @Input() form: FormGroup;
  @Output() formContinue: EventEmitter<void> = new EventEmitter();
  @Output() goBack: EventEmitter<void> = new EventEmitter();

  userRole = UserRole;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.formContinue.emit();
  }

  onBack() {
    this.goBack.emit();
  }

  onTerms() {
    this.modalService.open(TermsModalComponent, {windowClass: 'modal is-active'});
  }
}
