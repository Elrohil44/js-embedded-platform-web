import { Component, OnInit } from '@angular/core';
import { DeviceLocationService } from '../device-location.service';
import { DeviceLocation } from '../models/device-location';

@Component({
  selector: 'app-locations-list',
  templateUrl: './device-locations-list.component.html',
  styleUrls: ['./device-locations-list.component.sass']
})
export class LocationsListComponent implements OnInit {
  constructor(public locationService: DeviceLocationService) { }

  ngOnInit() {
  }

  getStatus(location: DeviceLocation) {
    if (location.healthy > 10) { return 'VERY BAD'; }

    return location.healthy > 5
      ? 'BAD'
      : 'OK';
  }
}
