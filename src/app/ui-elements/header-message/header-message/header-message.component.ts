import { Component, OnInit } from '@angular/core';
import { HeaderMessageService } from '../header-message.service';
import { HeaderMessageStateInterface } from '../header-message.interface';

@Component({
  selector: 'app-header-message',
  templateUrl: './header-message.component.html',
  styleUrls: ['./header-message.component.scss']
})
export class HeaderMessageComponent implements OnInit {
  message: HeaderMessageStateInterface;

  constructor(private headerMessageService: HeaderMessageService) {
  }

  ngOnInit() {
    this.headerMessageService.getIsVisibleAsObservable().subscribe(message => {
      this.message = message;
    });
  }

  onClose() {
    this.headerMessageService.hide();
  }
}
