import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private organizationEditService: OrganizationEditService,
              private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  onSave() {
    this.organizationEditService.update().subscribe(res => {
      console.log(res);
    });
  }

  onCancel() {
    this.activeModal.close();
  }

}
