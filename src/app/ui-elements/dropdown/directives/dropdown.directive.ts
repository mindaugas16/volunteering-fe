import { ContentChild, Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output } from '@angular/core';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownContentDirective } from './dropdown-content.directive';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnChanges {
  @Input('appDropdownIsOpen') appDropdownIsOpen: boolean;

  constructor(private elRef: ElementRef) {
  }

  @ContentChild(DropdownToggleDirective, {read: ElementRef}) toggleRef;
  @ContentChild(DropdownContentDirective, {read: ElementRef}) contentRef;

  @HostBinding('class.is-active') isOpen: boolean;

  @Output() dropdownOpen: EventEmitter<boolean> = new EventEmitter();

  @HostListener('document:click', ['$event'])
  private onClickOutside() {
    if (this.toggleRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
      return;
    }
    if (this.isOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnChanges(): void {
    this.isOpen = this.appDropdownIsOpen;
  }
}
