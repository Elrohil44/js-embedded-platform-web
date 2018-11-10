import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceLocationService } from '../device-location.service';
import { DeviceLocation } from '../models/device-location';
import { SuiModalService } from 'ng2-semantic-ui';
import { ConnectDeviceModal } from '../connect-device-modal/connect-device-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locations-list',
  templateUrl: './device-locations-list.component.html',
  styleUrls: ['./device-locations-list.component.sass']
})
export class DeviceLocationsListComponent implements OnInit, OnDestroy {
  locations: DeviceLocation[] = [];
  locationsSubscription$: Subscription;

  constructor(
    public locationService: DeviceLocationService,
    private modalService: SuiModalService,
  ) { }

  ngOnInit() {
    this.getDeviceLocations();
  }

  ngOnDestroy(): void {
    this.locationsSubscription$.unsubscribe();
  }

  getDeviceLocations(): void {
    this.locationsSubscription$ = this.locationService.getDeviceLocations()
      .subscribe((locations) => {
        this.locations = locations;
      });
  }

  onConnectClick(deviceLocation: DeviceLocation): void {
    this.modalService
      .open(new ConnectDeviceModal('Connect device to server', 'Provide an unique endpoint for the device:'))
      .onApprove((endpoint: string) => {
        this.locationService.sendConnectMessage(deviceLocation, endpoint);
      });
  }
}
