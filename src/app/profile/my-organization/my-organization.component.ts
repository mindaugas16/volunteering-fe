import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/services/events.service';
import { EventInterface } from '../../event/models/event.interface';
import { OrganizationEditService } from '../../organizations/organization-edit/organization-edit.service';

@Component({
  selector: 'app-my-organization',
  templateUrl: './my-organization.component.html',
  styleUrls: ['./my-organization.component.scss']
})
export class MyOrganizationComponent implements OnInit {
  events: EventInterface[] = [];
  loading = true;

  constructor(private eventsService: EventsService,
              private organizationEditService: OrganizationEditService
  ) {
  }

  ngOnInit() {
    this.eventsService.getEvents().subscribe(events => {
      this.events = events;
      this.loading = false;
    });
  }

  onSave() {
    this.organizationEditService.update().subscribe(() => {
      window.scroll(0, 0);
    }, () => window.scroll(0, 0));
  }

}
