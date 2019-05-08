import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabInterface } from '../tab.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: TabInterface[];
  @Input() selected: TabInterface;

  @Output() select: EventEmitter<TabInterface> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (!this.selected && this.tabs && this.tabs.length) {
      this.onTabSelect(this.tabs[0]);
    }
  }

  onTabSelect(tab: TabInterface) {
    this.selected = tab;
    this.select.emit(this.selected);
  }

}
