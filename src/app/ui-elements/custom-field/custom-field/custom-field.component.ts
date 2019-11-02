import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlsHelperService } from '../../../core/services/helpers/form-controls-helper.service';
import { CustomFieldInterface } from '../custom-field.interface';

@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss']
})
export class CustomFieldComponent implements OnChanges {
  @Input() customField: CustomFieldInterface;
  @Output() add: EventEmitter<CustomFieldInterface> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();

  form: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    value: new FormControl(null, Validators.required)
  });

  constructor() {}

  ngOnChanges() {
    if (this.customField) {
      this.form.patchValue({ title: this.customField.title, value: this.customField.value });
    }
  }

  onAdd() {
    if (this.form.invalid) {
      FormControlsHelperService.invalidateFormControls(this.form);
      return;
    }
    this.add.emit(this.form.value);
  }

  onRemove() {
    this.remove.emit();
  }
}
