import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../events/events.service';
import { OrganizationInterface } from '../../organizations/organization.interface';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {
  @Input() organization: OrganizationInterface;

  form: FormGroup;

  constructor(
    private eventsService: EventsService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
      date: new FormControl(null)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
    if (this.form.invalid) {
      throw new Error('Form is invalid');
    }

    this.eventsService.createEvent(this.form.value, this.organization._id).subscribe(event => {
      // this.router.navigate(['/events']);
    });
  }

}
