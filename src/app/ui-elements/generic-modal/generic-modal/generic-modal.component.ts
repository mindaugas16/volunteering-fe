import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentDirective } from '../directives/modal-content/modal-content.directive';
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

  @ContentChild(ModalHeaderDirective, { read: TemplateRef, static: false }) headerTemplate;
  @ContentChild(ModalContentDirective, { read: TemplateRef, static: false }) contentTemplate;
  @ContentChild(ModalFooterDirective, { read: TemplateRef, static: false }) footerTemplate;

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
