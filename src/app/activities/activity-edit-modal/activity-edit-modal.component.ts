import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventInterface } from '../../event/models/event.interface';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { ActivitiesService } from '../activities.service';
import { ActivityCreateInterface, ActivityInterface, DateRangeInterface } from '../models/activity.interface';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatHelper } from '../../core/services/helpers/date-format-helper.service';

@Component({
  selector: 'app-activity-edit-modal',
  templateUrl: './activity-edit-modal.component.html',
  styleUrls: ['./activity-edit-modal.component.scss']
})
export class ActivityEditModalComponent implements OnInit {
  @Output() success: EventEmitter<ActivityInterface> = new EventEmitter();
  event: EventInterface;
  activity: ActivityInterface;
  failureMessage: string;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, []),
    volunteersNeeded: new FormControl(1, [Validators.required, Validators.min(1)]),
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(0, []),
  });

  constructor(
    private activitiesService: ActivitiesService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    if (this.activity) {
      const {date, ...rest} = this.activity;
      this.form.patchValue({
        ...rest,
        startDate: date.start,
        endDate: date.end
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);

      if (!this.form.value.startDate) {
        this.failureMessage = 'Activity start date is required';
      }

      return;
    }

    const values = this.form.value;
    const activityInput: ActivityCreateInterface = {
      name: values.name,
      description: values.description,
      volunteersNeeded: +values.volunteersNeeded,
      date: DateFormatHelper.changeDateFormat(this.form.value.startDate, this.form.value.endDate),
      eventId: this.event._id
    };

    let actionObservable = this.activitiesService.create(activityInput);

    if (this.activity) {
      actionObservable = this.activitiesService.update(this.activity._id, activityInput);
    }

    actionObservable.subscribe(activity => {
      this.success.emit(activity);
      this.onClose();
    }, () => FormControlsHelperService.invalidateFormControls(this.form));
  }

  onDateSelect({start, end}: DateRangeInterface) {
    this.form.patchValue({
      startDate: start,
      endDate: end
    });
  }

  onClose() {
    this.activeModal.close();
  }

}
