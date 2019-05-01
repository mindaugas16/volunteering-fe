import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TagInterface } from '../tag.interface';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: TagInterface;
  @Input() isTagsEditEnabled: boolean;

  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() rename: EventEmitter<TagInterface> = new EventEmitter();

  @ViewChild('inputElement') inputElement: ElementRef;

  isRenameEnabled: boolean;
  tagLabel: string;

  @HostListener('keydown.enter')
  onSubmit() {
    this.tagLabel = this.tag.label;
    this.onRename();
  }

  @HostListener('keydown.escape')
  onCancel() {
    this.isRenameEnabled = false;
    if (this.tag.label) {
      this.tag.label = this.tagLabel;
    } else {
      this.onDeleteTag();
    }
  }

  constructor() {
  }

  ngOnInit() {
    if (this.tag.label) {
      this.tagLabel = this.tag.label;
    } else {
      this.isRenameEnabled = true;
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 0);
    }
  }

  onDeleteTag() {
    this.delete.emit(this.tag.id);
  }

  onClick() {
    if (this.isTagsEditEnabled) {
      this.isRenameEnabled = true;
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 0);
    }
  }

  onRename() {
    this.tag.label = this.tag.label.replace(/[^a-zA-Z0-9_]/g, '').replace(/\s+/g, '_');
    this.rename.emit(this.tag);
    this.isRenameEnabled = false;
  }
}
