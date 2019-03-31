import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../../../ui-elements/modal/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  rootViewContainer: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  open(viewContainerRef: ViewContainerRef, content?: any, options?: any): ComponentRef<any> {
    this.setRootViewContainerRef(viewContainerRef);
    return this.addDynamicComponent();
  }

  private close() {
    this.rootViewContainer.clear();
  }

  private setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  private addDynamicComponent(): ComponentRef<any> {
    const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    component.instance.close.subscribe(() => {
      this.close();
    });
    this.rootViewContainer.insert(component.hostView);

    return component;
  }
}
