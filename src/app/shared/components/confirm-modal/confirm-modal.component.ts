import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface ConfirmModalOptions {
  cssClasses?: string;
  submitButtonText?: string;
}

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() options?: ConfirmModalOptions = {
    cssClasses: 'is-primary',
    submitButtonText: 'Confirm'
  };

  @Output() confirm: EventEmitter<void> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  onConfirm() {
    this.confirm.emit();
    this.onClose();
  }

  onClose() {
    this.activeModal.close();
  }

}
