import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EventsService } from '../../events/events.service';
import { EventInterface } from '../../event/models/event.interface';
import { ActivitiesService } from '../activities.service';
import { ModalService } from '../../core/services/modal/modal.service';
import { ActivityEditModalComponent } from '../activity-edit-modal/activity-edit-modal.component';
import { DropdownItemInterface } from '../../ui-elements/dropdown/dropdown.interface';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent implements OnInit {
  event: EventInterface;
  dropdownActions: DropdownItemInterface[] = [
    {
      title: 'Edit',
      action: () => {}
    },
    {
      title: 'Cancel',
      action: () => {}
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private activitiesService: ActivitiesService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        return this.eventsService.getEvent(params['id']);
      })
    ).subscribe(event => {
      console.log(event);
      this.event = event;
    });
  }

  addActivity() {
    const modalRef = this.modalService.open(ActivityEditModalComponent);
    modalRef.instance.event = this.event;
    modalRef.instance.create.subscribe(activity => {
      this.event.activities.push(activity);
    });
  }

}
