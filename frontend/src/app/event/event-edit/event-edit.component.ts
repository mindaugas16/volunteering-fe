import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventInterface } from '../models/event.interface';
import { ApiService } from '../../api.service';
import { EventsService } from '../../events/events.service';
import { switchMap } from 'rxjs/operators';
import { OrganizationInterface } from '../../organizations/organization.interface';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit, OnChanges {
  @Input() event: EventInterface;
  @Input() organization: OrganizationInterface;

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    startDate: new FormControl(null, []),
    endDate: new FormControl(0, []),
    image: new FormControl(null)
  });

  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private eventsService: EventsService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.event);
  }

  onSubmit() {
    const {image, ...eventInput} = this.form.value;
    console.log(eventInput);
    eventInput.date = {
      start: eventInput.startDate,
      end: eventInput.endDate || null,
    };
    if (this.form.invalid) {
      throw new Error('Form is invalid');
    }
    const formData = new FormData();
    formData.append('image', image);
    this.apiService.upload(formData).pipe(
      switchMap((r) => {
        console.log(r);
        // @ts-ignore
        return this.eventsService.createEvent({...eventInput, imagePath: r.filePath}, this.organization._id);
      })
    ).subscribe(r => {
      console.log(r);
    });
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
        this.cd.markForCheck();
      };
    }
  }

}
