import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagInterface } from '../../tag/tag.interface';
import { AuthService } from '../../../auth/auth.service';
import { UserInterface } from '../../../auth/user.interface';
import { UserRole } from '../../../profile/user-type.enum';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Input() tags: TagInterface[] = [];
  @Input() isTagsEditEnabled: boolean;

  @Output() createTag: EventEmitter<TagInterface> = new EventEmitter();
  @Output() updateTag: EventEmitter<TagInterface> = new EventEmitter();
  @Output() deleteTag: EventEmitter<number> = new EventEmitter();

  shouldShowAddTag: boolean;
  user: UserInterface;
  userRoles = UserRole;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
  }

  onDeleteTag(id: number) {
    const foundIndex = this.tags.findIndex(tag => tag._id === id);
    if (foundIndex > -1) {
      if ((this.tags[foundIndex]._id && this.tags[foundIndex].label) || (this.tags[foundIndex]._id || this.tags[foundIndex].label)) {
        this.tags.splice(foundIndex, 1);
        this.deleteTag.emit(id);
      } else {
        this.tags = this.tags.filter(({_id}) => !!_id);
      }
    }
  }

  onRenameTag(tag: TagInterface) {
    if (tag.label) {
      const found = this.tags.find(({_id}) => _id === tag._id);
      if (found) {
        found.label = tag.label;
      }
      this.updateTag.emit(tag);
      return;
    }
    this.onDeleteTag(tag._id);
  }

  onAddTag() {
    this.shouldShowAddTag = true;
    this.tags.push({_id: null, label: ''});
  }

  onSaveTags(tag: TagInterface) {
    this.shouldShowAddTag = false;
    this.createTag.emit(tag);
  }
}
