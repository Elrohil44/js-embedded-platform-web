import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { DeviceService } from '../device.service';
import { Device } from '../models/device';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.sass']
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {
  device: Device;
  deviceSubscription: Subscription;
  endpoint: string;

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    const endpoint = decodeURIComponent(this.route.snapshot.paramMap.get('endpoint'));
    this.endpoint = endpoint;
    this.deviceSubscription = this.deviceService
      .getDevice(endpoint)
      .subscribe((device) => {
        if (!device) {
          this.messageService.add({
            class: 'error',
            content: 'Device not found',
          });
          this.location.back();
        }
        this.device = device;
        this.deviceSubscription.unsubscribe();
      });
  }

  ngOnDestroy() {
    if (this.deviceSubscription) {
      this.deviceSubscription.unsubscribe();
    }
  }
}
