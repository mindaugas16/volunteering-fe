import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Type } from '@angular/core';
import { GenericModalComponent } from '../../../ui-elements/generic-modal/generic-modal/generic-modal.component';
import { DOCUMENT } from '@angular/common';
import { ModalOptions } from '../../../ui-elements/generic-modal/generic-modal/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private nativeElement;

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  open<T>(component: Type<T>, options?: ModalOptions): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory(component);
    const componentRef = factory.create(this.injector);

    if (!!options) {
      this.setOptions(componentRef, options);
    }

    componentRef.hostView.detectChanges();

    this.nativeElement = componentRef.location.nativeElement;
    this.document.body.appendChild(this.nativeElement);
    return componentRef;
  }

  private setOptions(modalRef: ComponentRef<any>, options: ModalOptions) {
    const instance = modalRef.instance as GenericModalComponent;
    instance.closeable = options.closeable;
    instance.extraClasses = options.extraClasses;
  }

  close() {
    this.document.body.removeChild(this.nativeElement);
  }
}
