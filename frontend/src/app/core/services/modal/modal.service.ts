import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Type } from '@angular/core';
import { ModalComponent } from '../../../ui-elements/modal/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { ModalOptions } from '../../../ui-elements/modal/modal/modal.interface';

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

  open<T>(content: Type<T>, options?: ModalOptions): ComponentRef<T> {
    const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const ngContent = this.resolveNgContent(content);
    const componentRef = factory.create(this.injector, ngContent.resolvedContent);

    if (!!options) {
      this.setOptions(componentRef, options);
    }
    componentRef.instance.close.subscribe(() => {
      this.close();
    });

    componentRef.hostView.detectChanges();

    const {nativeElement} = componentRef.location;
    this.nativeElement = nativeElement;
    this.document.body.appendChild(nativeElement);

    return ngContent.component;
  }

  private resolveNgContent<T>(content: Type<T>): { resolvedContent: any[][], component?: ComponentRef<T> } {
    const factory = this.factoryResolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    return {component: componentRef, resolvedContent: [[componentRef.location.nativeElement]]};
  }

  private setOptions(modalRef: ComponentRef<ModalComponent>, options: ModalOptions) {
    const instance = modalRef.instance;
    instance.closeable = options.closeable;
    instance.extraClasses = options.extraClasses;
  }

  private close() {
    this.document.body.removeChild(this.nativeElement);
  }
}
