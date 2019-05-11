import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownItemInterface } from '../dropdown.interface';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() title: string;
  @Input() object: any;
  @Input() items: DropdownItemInterface[];
  @Input() isOpen: boolean;
  @Input() extraClasses: string;

  @Output() open: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onOpen() {
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen);
  }

}
