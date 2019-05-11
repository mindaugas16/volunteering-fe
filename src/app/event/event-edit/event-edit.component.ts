import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEventInterface, EventInterface } from '../models/event.interface';
import { ApiService } from '../../api.service';
import { EventsService } from '../../events/services/events.service';
import { OrganizationInterface } from '../../organizations/organization.interface';
import { DateRangeInterface } from '../../activities/models/activity.interface';
import { FormControlsHelperService } from '../../core/services/helpers/form-controls-helper.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DateFormatHelper } from '../../core/services/helpers/date-format-helper.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  @Input() event: EventInterface;
  @Input() organization: OrganizationInterface;
  @Output() eventChange: EventEmitter<EventInterface> = new EventEmitter<EventInterface>();

  @ViewChild('inputImageElement') inputImageElement: ElementRef;

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    startDate: new FormControl(null, []),
    endDate: new FormControl(0, []),
    image: new FormControl(null),
    location: new FormGroup({
      title: new FormControl(null),
      address: new FormControl(null),
      address2: new FormControl(null),
      city: new FormControl(null),
      country: new FormControl(null),
      zipCode: new FormControl(null)
    })
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
        endDate: date.end
      });
      if (this.event.imagePath) {
        this.image = this.event.imagePath;
      }
    }
  }

  onDateSelect({start, end}: DateRangeInterface) {
    this.form.patchValue({
      startDate: start,
      endDate: end
    });
  }

  onSubmit() {
    const {image, startDate, endDate, ...eventInput} = this.form.value;
    eventInput.date = DateFormatHelper.changeDateFormat(startDate, endDate);
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
    }

    this.uploadImage(image).subscribe(imagePath => {
      if (this.event) {
        this.updateEvent(eventInput, imagePath);
        return;
      }

      this.createEvent(eventInput, imagePath);
    });
  }

  private uploadImage(image): Observable<string> {
    if (!image) {
      return of(null);
    }
    return new Observable(observer => {
      const formData = new FormData();
      formData.append('image', image);
      this.apiService.upload(formData).subscribe(res => {
        observer.next((res as any).fileName);
        observer.complete();
      });
    });
  }

  onRemoveImage() {
    this.image = null;
    this.inputImageElement.nativeElement.value = this.image;
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
        this.cd.markForCheck();
      };
    }
  }


  private updateEvent(eventInput: CreateEventInterface, filePath: string) {
    this.eventsService.update(this.event._id, {...eventInput, imagePath: filePath}).subscribe(event => {
      this.eventChange.emit(event);
      this.onCloseModal();
    }, () => FormControlsHelperService.invalidateFormControls(this.form));
  }


  private createEvent(eventInput: CreateEventInterface, filePath: string) {
    this.eventsService.createEvent({...eventInput, imagePath: filePath}).subscribe(event => {
      this.eventChange.emit(event);
      this.onCloseModal();
    }, () => FormControlsHelperService.invalidateFormControls(this.form));
  }

}
