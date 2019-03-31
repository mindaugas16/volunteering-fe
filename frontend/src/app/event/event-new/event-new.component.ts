import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../events/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {
  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null),
    date: new FormControl(null)
  });

  constructor(
    private eventsService: EventsService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid');
      return '';
    }

    this.eventsService.createEvent(this.form.value).subscribe(event => {
      this.router.navigate(['/events']);
    });
  }

}
