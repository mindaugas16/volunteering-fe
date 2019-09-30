import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-list-wrapper',
  templateUrl: './generic-list-wrapper.component.html',
  styleUrls: ['./generic-list-wrapper.component.scss']
})
export class GenericListWrapperComponent implements OnInit {
  @Input() items: any[];
  @Input() loading: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
