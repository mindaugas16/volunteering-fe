import { Component, Input, OnInit } from '@angular/core';

export interface AbstractLabelInterface {
  extraClass?: string;
  name: string;
  condition: boolean;
}

@Component({
  selector: 'app-abstract-label',
  templateUrl: './abstract-label.component.html',
  styleUrls: ['./abstract-label.component.scss']
})
export class AbstractLabelComponent implements OnInit {
  @Input() labels: AbstractLabelInterface[];
  @Input() currentLabel: AbstractLabelInterface;

  constructor() {
  }

  ngOnInit() {
    if (this.labels && this.labels.length) {
      this.currentLabel = this.labels.find(label => label.condition);
    }
  }

}
