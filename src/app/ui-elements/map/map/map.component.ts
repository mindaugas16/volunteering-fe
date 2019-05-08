import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  latitude = 51.673858;
  longitude = 7.815982;
  marker =
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
    };

  constructor() {
  }

  ngOnInit() {
  }

}
