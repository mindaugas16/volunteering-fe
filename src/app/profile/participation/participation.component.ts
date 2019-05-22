import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { EventInterface } from '../../event/models/event.interface';

@Component({
  selector: 'app-participation',
  templateUrl: './participation.component.html',
  styleUrls: ['./participation.component.scss']
})
export class ParticipationComponent implements OnInit {
  events: EventInterface[] = [];

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUserParticipation().subscribe(participation => {
      this.events = this.groupParticipationByEvent(participation);
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

}
