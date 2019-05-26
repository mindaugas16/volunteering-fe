import { Component, Input, OnInit } from '@angular/core';

export interface AbstractLabelInterface {
  extraClass?: string;
  name: string;
  status?: number;
}

@Component({
  selector: 'app-abstract-label',
  templateUrl: './abstract-label.component.html',
  styleUrls: ['./abstract-label.component.scss']
})
export class AbstractLabelComponent implements OnInit {
  @Input() label: AbstractLabelInterface;

  constructor() {
  }

  ngOnInit() {
  }

}
