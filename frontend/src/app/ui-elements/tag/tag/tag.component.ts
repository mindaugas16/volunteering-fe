import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: any;
  @Input() isTagsEditEnabled: boolean;
  @Output() delete: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onDeleteTag() {
    this.delete.emit(this.tag.id);
  }

  onSearch() {
  }

}
