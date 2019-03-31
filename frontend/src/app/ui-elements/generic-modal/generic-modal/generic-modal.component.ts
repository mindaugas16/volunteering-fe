import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ModalContentDirective } from '../modal-content.directive';
import { ModalService } from '../../../core/services/modal/modal.service';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.scss']
})
export class GenericModalComponent implements OnInit {
  @Input() closeable = true;
  @Input() extraClasses: string;

  @Output() close: EventEmitter<any> = new EventEmitter();

  @ContentChild(ModalContentDirective, {read: TemplateRef}) contentTemplate;

  constructor(
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
  }

  onClose() {
    this.modalService.close();
    this.close.emit();
  }

}
