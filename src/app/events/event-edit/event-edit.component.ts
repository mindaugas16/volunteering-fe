import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEventInterface, EventInterface, EventStatus } from '../event/models/event.interface';
import { ApiService } from '../../api.service';
import { EventsService } from '../services/events.service';
import { DateRangeInterface } from '../../activities/models/activity.interface';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { DateFormatHelper } from '../../core/services/helpers/date-format-helper.service';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { CustomFieldInterface } from '../../ui-elements/custom-field/custom-field.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { BreadcrumbInterface } from '../../ui-elements/breadcrumb/breadcrumb.interface';
import { UploaderService } from '../../ui-elements/upload-image/uploader.service';

const CUSTOM_FIELDS_LIMIT = 4;

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    startDate: new FormControl(null, []),
    endDate: new FormControl(0, []),
    image: new FormControl(null),
    status: new FormControl(null, Validators.required),
    location: new FormGroup({
      title: new FormControl(null),
      address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      zipCode: new FormControl(null)
    }),
    customFields: new FormGroup({})
  });
  eventStatus = EventStatus;

  date;
  shouldShowCustomFieldAddForm: boolean;
  customFields: CustomFieldInterface[] = [];
  customFieldsLimit = CUSTOM_FIELDS_LIMIT;

  event: EventInterface;
  breadcrumb: BreadcrumbInterface[] = [];
  image;
  removeImage: boolean;

  constructor(
    private apiService: ApiService,
    private eventsService: EventsService,
    private activeModal: NgbActiveModal,
    private headerMessageService: HeaderMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private uploaderService: UploaderService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      filter(params => !!params.id),
      switchMap(params => {
        return this.eventsService.getEvent(params.id);
      })
    ).subscribe(event => {
      this.event = event;
      if (this.event) {
        const {date, location, ...rest} = this.event;
        this.form.patchValue({
          ...rest,
          startDate: date.start,
          endDate: date.end
        });
        if (this.event.customFields && this.event.customFields.length) {
          this.event.customFields.forEach(field => {
            this.appendCustomField(field);
          });
        }
        if (this.event.imagePath) {
          this.image = this.event.imagePath;
        }
        this.breadcrumb = [
          {title: 'Events', link: ['/events']},
          {title: this.event.title, link: ['/events', 'details', this.event._id]},
          {title: 'Edit', link: null}
        ];
      }
    });
  }

  onImageChange(file) {
    this.form.patchValue({
      image: file
    });
  }

  onDateSelect({start, end}: DateRangeInterface) {
    this.form.patchValue({
      startDate: start,
      endDate: end
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }

    let uploadObservable = of(this.removeImage ? 'remove' : null);

    const {image, startDate, endDate, ...eventInput} = this.form.value;
    eventInput.date = DateFormatHelper.changeDateFormat(startDate, endDate);
    if (eventInput.status) {
      eventInput.status = +eventInput.status;
    }

    if (image && !this.removeImage) {
      uploadObservable = this.uploadImage(image);
    }

    uploadObservable.subscribe(imagePath => {
      if (this.event) {
        this.updateEvent(eventInput, imagePath);
        return;
      }

      this.createEvent(eventInput, imagePath);
    });
  }

  private uploadImage(image): Observable<string> {
    return this.uploaderService.upload(image);
  }

  onCancel() {
    this.location.back();
  }

  private updateEvent(eventInput: CreateEventInterface, filePath: string) {
    const {customFields, ...rest} = eventInput;
    const updateEvent = {...rest, imagePath: filePath, customFields: this.customFields};

    this.eventsService.update(this.event._id, updateEvent).subscribe(event => {
      this.headerMessageService.show('Event updated successfully', 'SUCCESS');
      this.router.navigate(['/events', 'details', event._id]);
    }, () => FormControlsHelperService.invalidateFormControls(this.form));
  }

  private createEvent(eventInput: CreateEventInterface, filePath: string) {
    const {customFields, ...rest} = eventInput;
    const newEvent = {...rest, imagePath: filePath, customFields: this.customFields};

    this.eventsService.createEvent(newEvent).subscribe(event => {
      this.headerMessageService.show('Event created successfully', 'SUCCESS');
      this.router.navigate(['/events', 'details', event._id]);
    }, () => FormControlsHelperService.invalidateFormControls(this.form));
  }

  onAddCustomField(field: CustomFieldInterface): void {
    const size = this.customFields.length;
    // Create unique random customField formControlName
    field.id = `customField${size + Math.floor(1000 + Math.random() * 9000)}`;
    this.appendCustomField(field);
    this.hideCustomFieldForm();
  }

  /**
   * Add custom field to formGroup and to customFields array
   * @param field
   */
  private appendCustomField(field: CustomFieldInterface) {
    (this.form.get('customFields') as FormGroup).addControl(field.id, new FormControl(field.value));
    this.customFields.push(field);
  }

  onRemoveFormControl(id) {
    const foundIndex = this.customFields.findIndex(c => c.id === id);
    if (foundIndex > -1) {
      (this.form.get('customFields') as FormGroup).removeControl(id);
      this.customFields.splice(foundIndex, 1);
    }
  }

  getCustomField(id): CustomFieldInterface {
    return this.customFields.find(c => c.id === id);
  }

  hideCustomFieldForm() {
    this.shouldShowCustomFieldAddForm = false;
  }

  getCustomFieldsControls() {
    return (this.form.get('customFields') as any).controls;
  }
}
