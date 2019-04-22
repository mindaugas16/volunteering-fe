import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventInterface } from '../../event/models/event.interface';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { ActivitiesService } from '../activities.service';
import { ActivityInterface } from '../models/activity.interface';
import { ModalService } from '../../core/services/modal/modal.service';

@Component({
  selector: 'app-activity-edit-modal',
  templateUrl: './activity-edit-modal.component.html',
  styleUrls: ['./activity-edit-modal.component.scss']
})
export class ActivityEditModalComponent implements OnInit {
  @Output() create: EventEmitter<ActivityInterface> = new EventEmitter();
  event: EventInterface;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    volunteersNeeded: new FormControl(1, [Validators.required, Validators.min(1)]),
    startDate: new FormControl(null, []),
    endDate: new FormControl(0, []),
  });

  constructor(
    private activitiesService: ActivitiesService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }

    const values = this.form.value;
    const activityInput: ActivityInterface = {
      name: values.name,
      description: values.description,
      volunteersNeeded: +values.volunteersNeeded,
      date: {
        start: this.form.value.startDate,
        end: this.form.value.endDate || null,
      },
      eventId: this.event._id
    };

    this.activitiesService.createActivity(activityInput).subscribe(activity => {
      this.create.emit(activity);
      this.onClose();
    }, error => FormControlsHelperService.invalidateFormControls(this.form));
  }

  onClose() {
    this.modalService.close();
  }

}
