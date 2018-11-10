import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { Device } from '../models/device';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.sass']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devices: Device[] = [];
  devices$: Subscription;

  constructor(public deviceService: DeviceService) { }

  ngOnInit() {
    this.devices$ = this.deviceService.getDevices()
      .subscribe((devices: Device[]) => { this.devices = devices; });
  }

  ngOnDestroy(): void {
    this.devices$.unsubscribe();
  }

  encodeURIComponent(s: string): string {
    return encodeURIComponent(s);
  }
}
