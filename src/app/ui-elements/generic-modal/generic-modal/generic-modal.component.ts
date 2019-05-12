import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalContentDirective } from '../directives/modal-content/modal-content.directive';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFooterDirective } from '../directives/modal-footer/modal-footer.directive';
import { ModalHeaderDirective } from '../directives/modal-header/modal-header.directive';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {
  @Input() closeable = true;
  @Input() extraClasses: string;

  @ContentChild(ModalHeaderDirective, {read: TemplateRef}) headerTemplate;
  @ContentChild(ModalContentDirective, {read: TemplateRef}) contentTemplate;
  @ContentChild(ModalFooterDirective, {read: TemplateRef}) footerTemplate;

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
