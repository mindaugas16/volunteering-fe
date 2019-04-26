import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventInterface } from '../models/event.interface';
import { ApiService } from '../../api.service';
import { EventsService } from '../../events/events.service';
import { switchMap } from 'rxjs/operators';
import { OrganizationInterface } from '../../organizations/organization.interface';
import { DateRangeInterface } from '../../activities/models/activity.interface';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  @Input() event: EventInterface;
  @Input() organization: OrganizationInterface;
  @Output() eventChange: EventEmitter<EventInterface> = new EventEmitter<EventInterface>();

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    startDate: new FormControl(null, []),
    endDate: new FormControl(0, []),
    image: new FormControl(null)
  });

  image;

  date;

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private eventsService: EventsService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    if (this.event) {
      const {date, ...rest} = this.event;
      this.form.patchValue({
        ...rest,
        startDate: date.start,
        endDate: date.end,
      });
    }
    console.log(this.form.value);
  }

  onDateSelect({start, end}: DateRangeInterface) {
    this.form.patchValue({
      startDate: start,
      endDate: end
    });
  }

  onSubmit() {
    const {image, ...eventInput} = this.form.value;
    eventInput.date = {
      start: eventInput.startDate,
      end: eventInput.endDate || eventInput.startDate,
    };
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
    }

    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      this.apiService.upload(formData).pipe(
        switchMap((r) => {
          console.log(r);
          // @ts-ignore
          return this.eventsService.createEvent({...eventInput, imagePath: r.filePath}, this.organization._id);
        })
      ).subscribe(event => {
        this.eventChange.emit(event);
        this.onCloseModal();
      }, error => FormControlsHelperService.invalidateFormControls(this.form));
    } else {
      this.eventsService.createEvent({...eventInput, imagePath: null}, this.organization._id).subscribe(event => {
        this.eventChange.emit(event);
        this.onCloseModal();
      }, error => FormControlsHelperService.invalidateFormControls(this.form));
    }
  }

  onCloseModal() {
    this.activeModal.close();
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          image: file
        });
        this.image = reader.result;
        console.log(this.image);
        this.cd.markForCheck();
      };
    }
  }

}
