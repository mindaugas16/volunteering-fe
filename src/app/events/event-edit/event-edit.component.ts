import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DateRangeInterface } from '../../activities/models/activity.interface';
import { DateFormatHelper } from '../../core/services/helpers/date-format-helper.service';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { BreadcrumbInterface } from '../../ui-elements/breadcrumb/breadcrumb.interface';
import { CustomFieldInterface } from '../../ui-elements/custom-field/custom-field.interface';
import { HeaderMessageService } from '../../ui-elements/header-message/header-message.service';
import { UploaderService } from '../../ui-elements/upload-image/uploader.service';
import {
  CreateEventInterface,
  EventInterface,
  EventStatus,
  OrganizationEvent
} from '../event/models/event.interface';
import { EventsService } from '../services/events.service';

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
    })
  });
  eventStatus = EventStatus;

  date;
  shouldShowCustomFieldAddForm: boolean;
  customFieldsLimit = CUSTOM_FIELDS_LIMIT;

  event: EventInterface;
  breadcrumb: BreadcrumbInterface[] = [];
  image;
  removeImage: boolean;
  isDirty: boolean;

  constructor(
    private eventsService: EventsService,
    private headerMessageService: HeaderMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private uploaderService: UploaderService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap(params => {
          if (params.id) {
            return this.eventsService.getEvent(params.id);
          }
          return of(null);
        })
      )
      .subscribe(event => {
        this.event = event ? event : new OrganizationEvent();
        const { date, location, ...rest } = this.event;
        this.form.patchValue({
          ...rest,
          startDate: date ? date.start : null,
          endDate: date ? date.end : null
        });
        if (this.event.imagePath) {
          this.image = this.event.imagePath;
        }
        this.breadcrumb = [
          { title: 'Events', link: ['/events'] },
          { title: this.event.title, link: ['/events', 'details', this.event._id] },
          { title: 'Edit', link: null }
        ];

        if (this.event.customFields && this.event.customFields.length) {
          this.event.customFields.sort((a, b) => a.position - b.position);
        }
      });
  }

  onImageChange(file) {
    this.form.patchValue({
      image: file
    });
  }

  onDateSelect({ start, end }: DateRangeInterface) {
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

    const { image, startDate, endDate, ...eventInput } = this.form.value;
    eventInput.date = DateFormatHelper.changeDateFormat(startDate, endDate);
    if (eventInput.status) {
      eventInput.status = +eventInput.status;
    }

    if (image && !this.removeImage) {
      uploadObservable = this.uploadImage(image);
    }

    if (this.event.customFields && this.event.customFields.length) {
      this.event.customFields = this.event.customFields.map(
        (field: CustomFieldInterface, index: number) => {
          const { isOpen, ...rest } = field;
          rest.position = index;
          return rest;
        }
      );
    }

    uploadObservable.subscribe(imagePath => {
      if (this.event) {
        this.updateEvent({ ...eventInput, customFields: this.event.customFields }, imagePath);
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
    const { customFields, ...rest } = eventInput;
    const updateEvent = { ...rest, imagePath: filePath, customFields: this.event.customFields };

    this.eventsService.update(this.event._id, updateEvent).subscribe(
      event => {
        this.headerMessageService.show('Event updated successfully', 'SUCCESS');
        this.router.navigate(['/events', 'details', event._id]);
      },
      () => FormControlsHelperService.invalidateFormControls(this.form)
    );
  }

  private createEvent(eventInput: CreateEventInterface, filePath: string) {
    const { customFields, ...rest } = eventInput;
    const newEvent = { ...rest, imagePath: filePath, customFields: this.event.customFields };

    this.eventsService.createEvent(newEvent).subscribe(
      event => {
        this.headerMessageService.show('Event created successfully', 'SUCCESS');
        this.router.navigate(['/events', 'details', event._id]);
      },
      () => FormControlsHelperService.invalidateFormControls(this.form)
    );
  }

  onAddCustomField(field: CustomFieldInterface): void {
    const size = this.event.customFields.length;
    // Create unique random customField formControlName
    field.id = `customField${size + Math.floor(1000 + Math.random() * 9000)}`;
    field.position = size;
    this.event.customFields.push(field);

    this.hideCustomFieldForm();
  }

  onEditCustomField(id: string, field: CustomFieldInterface) {
    const found = this.event.customFields.find(eventField => eventField.id === id);
    if (found) {
      found.title = field.title;
      found.value = field.value;
      found.isOpen = false;
    }
  }

  onRemoveCustomField(id: string) {
    const foundIndex = this.event.customFields.findIndex(c => c.id === id);
    if (foundIndex > -1) {
      this.event.customFields.splice(foundIndex, 1);
    }
  }

  hideCustomFieldForm() {
    this.shouldShowCustomFieldAddForm = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.event.customFields, event.previousIndex, event.currentIndex);
  }
}
