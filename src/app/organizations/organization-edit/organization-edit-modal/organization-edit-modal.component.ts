import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrganizationInterface } from '../../organization.interface';
import { OrganizationEditService } from '../organization-edit.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organization-edit-modal',
  templateUrl: './organization-edit-modal.component.html',
  styleUrls: ['./organization-edit-modal.component.scss']
})
export class OrganizationEditModalComponent implements OnInit {
  @Input() organization: OrganizationInterface;
  @Output() update: EventEmitter<any> = new EventEmitter();

  constructor(private organizationEditService: OrganizationEditService,
              private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  onSave() {
    this.organizationEditService.update().subscribe(() => {
      this.update.emit();
    });
  }

  onCancel() {
    this.activeModal.close();
  }

}
