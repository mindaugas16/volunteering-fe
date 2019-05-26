import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFieldInterface } from '../custom-field.interface';
import { FormControlsHelperService } from '../../../core/services/helpers/form-controls-helper.service';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss']
})
export class CustomFieldComponent implements OnInit {
  @Input() customFields: CustomFieldInterface[] = [];
  @Output() add: EventEmitter<CustomFieldInterface> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required)
  });

  constructor() {
  }

  ngOnInit() {
  }

  onAdd() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    if (this.customFields.findIndex(c => c.title === this.form.get('title').value) > -1) {
      this.form.get('title').setErrors({unique: true});
      return;
    }
    this.add.emit(this.form.value);
  }

  onRemove() {
    this.remove.emit();
  }

}
