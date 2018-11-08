import { Injectable } from '@angular/core';
import { DeviceLocation } from './models/device-location';

@Injectable({
  providedIn: 'root'
})
export class DeviceLocationService {
  locations: DeviceLocation[] = [{
    ip: '123.123.124.125',
    port: 1234,
    healthy: 0,
  }];

  add(location: DeviceLocation) {
    this.locations.push(location);
  }

  remove(location: DeviceLocation) {
    this.locations = this.locations.filter(loc => loc.ip !== location.ip
      && loc.port !== location.port);
  }

  update(locations: DeviceLocation[]) {
    this.locations = locations;
  }

  clear() {
    this.locations = [];
  }
}
