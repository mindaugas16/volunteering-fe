import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../events/services/events.service';
import { EventInterface } from '../../event/models/event.interface';
import { OrganizationEditService } from '../../organizations/organization-edit/organization-edit.service';
import { AuthService } from '../../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-organization',
  templateUrl: './my-organization.component.html',
  styleUrls: ['./my-organization.component.scss']
})
export class MyOrganizationComponent implements OnInit {
  events: EventInterface[] = [];
  loading = true;

  constructor(private eventsService: EventsService,
              private organizationEditService: OrganizationEditService,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.getCurrentUser(false).pipe(switchMap(user => {
      return this.eventsService.getEvents({organizationId: user._id});
    })).subscribe(events => {
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
