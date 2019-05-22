import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { CalendarDateFormatter, CalendarEvent } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { Router } from '@angular/router';
import { EventInterface } from '../../event/models/event.interface';
import { ActivityInterface } from '../../activities/models/activity.interface';
import { CustomDateFormat } from '../../ui-elements/calendar/custom-date-format.provider';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  groupedEvents: EventInterface[] = [];

  constructor(private profileService: ProfileService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.profileService.getUserParticipation().subscribe(participation => {
      this.events = participation.map(part => {
        return {
          start: startOfDay(new Date(part.activity.date.start)),
          end: startOfDay(new Date(part.activity.date.end)),
          title: part.activity.name,
          _id: part.activity.event._id
        };
      });
      this.groupedEvents = this.groupParticipationByEvent(participation);
    });
  }

  private groupParticipationByEvent(participation): EventInterface[] {
    return participation.reduce((acc: EventInterface[], part) => {
      const found = acc.find(e => e._id === part.activity.event._id);
      if (found) {
        found.activities.push(part.activity);
      } else {
        acc.push({...part.activity.event, activities: [part.activity]});
      }
      return acc;
    }, []);
  }

  onEvent(event) {
    this.router.navigate(['/event', event._id]);
  }

  onActivity(activity: ActivityInterface) {
    this.viewDate = new Date(activity.date.start);
  }
}
