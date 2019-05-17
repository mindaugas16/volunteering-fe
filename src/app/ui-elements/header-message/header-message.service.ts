import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeaderMessageOptions, HeaderMessageStateInterface, HeaderMessageStatus } from './header-message.interface';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HeaderMessageService {
  private visible: BehaviorSubject<HeaderMessageStateInterface> = new BehaviorSubject({message: null, visible: false});

  constructor(private viewportScroller: ViewportScroller) {
  }

  show(message: string, status: HeaderMessageStatus, options: HeaderMessageOptions = {closeable: true, closeAfter: 5000}) {
    this.visible.next({message, status, visible: true, options});
    this.viewportScroller.scrollToPosition([0, 0]);

    if (options && options.closeAfter) {
      setTimeout(() => {
        this.hide();
      }, options.closeAfter);
    }
  }

  hide() {
    this.visible.next({message: null, visible: false});
  }

  getIsVisibleAsObservable(): Observable<HeaderMessageStateInterface> {
    return this.visible.asObservable();
  }
}
