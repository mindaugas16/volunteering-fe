import { ContentChild, Directive, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { DropdownToggleDirective } from './dropdown-toggle.directive';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {

  constructor(private elRef: ElementRef) {
  }

  @ContentChild(DropdownToggleDirective, {read: ElementRef}) toggleRef;

  @HostBinding('class.is-active') isOpen: boolean;

  @Output() dropdownOpen: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click', ['$event'])
  private onToggle() {
    // const toggle = this.toggleRef || this.elRef;
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  private onClickOutside() {
    if (this.isOpen && !this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {
  }
}
