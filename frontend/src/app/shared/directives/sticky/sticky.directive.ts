import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {

  @HostBinding('class.is-active') stick = false;

  constructor(private elRef: ElementRef) {
    window.addEventListener('scroll', () => this.checkScroll(this.elRef.nativeElement.offsetHeight));
  }

  /**
   * IE 11 sticky position support
   * Check if was scrolled more then excepted element height and add class position: fixed
   * @param {number} exceptedElementHeight
   */
  private checkScroll(exceptedElementHeight: number) {
    this.stick = window.pageYOffset > exceptedElementHeight;
  }

}
