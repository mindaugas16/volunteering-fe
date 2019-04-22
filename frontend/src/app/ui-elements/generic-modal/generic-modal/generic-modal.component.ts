import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ModalContentDirective } from '../modal-content.directive';
import { ModalService } from '../../../core/services/modal/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {
  @Input() closeable = true;
  @Input() extraClasses: string;

  @ContentChild(ModalContentDirective, {read: TemplateRef}) contentTemplate;

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  onClose() {
    this.activeModal.close();
  }

}
