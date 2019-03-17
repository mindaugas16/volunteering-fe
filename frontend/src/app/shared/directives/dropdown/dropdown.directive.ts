import { ContentChild, Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { DropdownToggleDirective } from './dropdown-toggle.directive';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @ContentChild(DropdownToggleDirective, {read: ElementRef}) toggleRef;

  @HostBinding('class.is-active') isOpen: boolean;

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

  constructor(private elRef: ElementRef) {
  }

  ngOnInit(): void {
  }
}
