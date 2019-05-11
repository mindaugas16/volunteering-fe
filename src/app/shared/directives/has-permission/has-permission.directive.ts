import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserInterface } from '../../../auth/user.interface';
import { AuthService } from '../../../auth/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {
  user: UserInterface;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  @Input()
  set appHasPermission({condition, args}) {
    this.viewContainer.clear();
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      const functionCallBack = condition.bind(this, args);

      if (functionCallBack()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnInit(): void {
  }

}
