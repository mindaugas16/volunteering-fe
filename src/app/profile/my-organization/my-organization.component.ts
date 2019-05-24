import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/services/events.service';
import { OrganizationEditService } from '../../organizations/organization-edit/organization-edit.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEditComponent } from '../../events/event-edit/event-edit.component';
import { OrganizationInterface } from '../../organizations/organization.interface';
import { OrganizationService } from '../../organizations/organization.service';

@Component({
  selector: 'app-my-organization',
  templateUrl: './my-organization.component.html',
  styleUrls: ['./my-organization.component.scss']
})
export class MyOrganizationComponent implements OnInit {
  loading = true;
  organization: OrganizationInterface;

  constructor(private eventsService: EventsService,
              private organizationEditService: OrganizationEditService,
              private authService: AuthService,
              private modalService: NgbModal,
              private organizationService: OrganizationService
  ) {
  }

  ngOnInit() {
    this.authService.getCurrentUser(false).pipe(switchMap(user => {
      return this.organizationService.getOrganization(user._id);
    })).subscribe(organization => {
      this.loading = false;
      this.organization = organization;
    });
  }

  onSave() {
    this.organizationEditService.update().subscribe(() => {
      window.scroll(0, 0);
    }, () => window.scroll(0, 0));
  }

  onAddEvent() {
    const modalRef = this.modalService.open(EventEditComponent, {windowClass: 'modal is-active'});
    modalRef.componentInstance.organization = this.organization;
    modalRef.componentInstance.eventChange.subscribe(event => {
      this.organization.events = [event, ...this.organization.events];
    });
  }

}
