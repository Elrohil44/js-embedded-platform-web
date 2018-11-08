import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DeviceService } from '../device.service';
import { Device } from '../models/device';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.sass']
})
export class DeviceDetailsComponent implements OnInit {
  device: Device;

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getDevice();
  }

  getDevice(): void {
    const endpoint = this.route.snapshot.paramMap.get('endpoint');
    this.device = this.deviceService.getDevice(endpoint);
    if (!this.device) {
      this.messageService.add({
        class: 'error',
        content: 'Device not found',
      });
      this.location.back();
    }
  }
}
