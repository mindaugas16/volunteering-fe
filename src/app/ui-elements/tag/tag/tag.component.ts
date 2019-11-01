import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, HostBinding } from '@angular/core';
import { TagInterface } from '../tag.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag: TagInterface;
  @Input() isTagsEditEnabled: boolean;
  @Input() actionType: 'add' | 'edit' = 'edit';

  @Input('isActive')
  set _isActive(value: boolean) {
    this.isActive = value;
  }

  @Output() create: EventEmitter<TagInterface> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() rename: EventEmitter<TagInterface> = new EventEmitter();

  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;

  isRenameEnabled: boolean;
  tagLabel: string;

  @HostBinding('class.is-active') isActive;

  @HostListener('keydown.enter')
  onSubmit() {
    this.inputElement.nativeElement.blur();
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

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.tag && this.tag.label) {
      this.tagLabel = this.tag.label;
    } else {
      this.isRenameEnabled = true;
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
      }, 0);
    }
  }

  onDeleteTag() {
    this.delete.emit(this.tag._id);
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
    this.tagLabel = this.tag.label;
    if (this.tag.label) {
      this.tag.label = this.tag.label.replace(/[^a-zA-Z0-9_]/g, '').replace(/\s+/g, '_');
      this.tag._id !== null ? this.rename.emit(this.tag) : this.create.emit(this.tag);
    }
    this.isRenameEnabled = false;
  }
}
