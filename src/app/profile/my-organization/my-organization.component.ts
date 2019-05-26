import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/services/events.service';
import { OrganizationEditService } from '../../organizations/organization-edit/organization-edit.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationInterface } from '../../organizations/organization.interface';
import { OrganizationService } from '../../organizations/organization.service';
import { EventInterface, EventStatus } from '../../events/event/models/event.interface';

@Component({
  selector: 'app-my-organization',
  templateUrl: './my-organization.component.html',
  styleUrls: ['./my-organization.component.scss']
})
export class MyOrganizationComponent implements OnInit {
  loading = true;
  organization: OrganizationInterface;
  filteredEvents: EventInterface[] = [];
  showEventStatuses: EventStatus[] = [];
  eventStatus = EventStatus;
  currentPage = 1;
  pageSize = 12;

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
      this.filteredEvents = this.organization.events;
    });
  }

  onFilterEvents(filter: EventStatus) {
    const foundIndex = this.showEventStatuses.indexOf(filter);
    if (foundIndex > -1) {
      this.showEventStatuses.splice(foundIndex, 1);
    } else {
      this.showEventStatuses.push(filter);
    }
    this.filteredEvents = this.showEventStatuses.length ?
      this.organization.events.filter(event => this.isFilterActivated(event.status)) : this.organization.events;
  }

  isFilterActivated(filter: EventStatus) {
    return this.showEventStatuses.indexOf(filter) > -1;
  }

  onSave() {
    this.organizationEditService.update().subscribe(() => {
      window.scroll(0, 0);
    }, () => window.scroll(0, 0));
  }
}
