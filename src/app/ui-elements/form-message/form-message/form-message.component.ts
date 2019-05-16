import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.scss']
})
export class FormMessageComponent implements OnInit {
  @Input() message: string;
  @Input() status: 'success' | 'danger' | 'warning' | 'info';
  @Input() closeable = true;
  @Input() isVisible = true;

  @Output() close: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => {
      this.onClose();
    }, 5000);
  }

  onClose() {
    if (this.closeable) {
      this.isVisible = false;
      this.close.emit();
    }
  }

}
