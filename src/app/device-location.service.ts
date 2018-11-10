import { Injectable } from '@angular/core';
import { DeviceLocation } from './models/device-location';
import { WebSocketService } from './websocket.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { MessageType, WebSocketMessage } from './models/websocket-types';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceLocationService {
  constructor(
    private webSocketService: WebSocketService,
    private messageService: MessageService,
  ) { }

  locations: DeviceLocation[] = [{
    ip: '123.123.124.125',
    port: 1234,
    healthy: 0,
  }];

  getDeviceLocations(): Observable<DeviceLocation[]> {
    return this.webSocketService.webSocket.multiplex(
      () => ({ type: MessageType.SUB_DEVICE_LOCATIONS }),
      () => ({ type: MessageType.UNSUB_DEVICE_LOCATIONS }),
      (msg: WebSocketMessage) => msg.type === MessageType.DEVICE_LOCATIONS)
      .pipe(
        catchError((err) => {
          this.messageService.add({
            class: 'error',
            content: err.message || 'Could not connect to WebSocket, make sure it is running',
          });
          return of({
            type: MessageType.DEVICE_LOCATIONS,
            deviceLocations: [],
          } as WebSocketMessage);
        }),
        map(msg => msg.deviceLocations),
      );
  }

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

  sendConnectMessage(location: DeviceLocation, endpoint: string): void {
    this.webSocketService.webSocket
      .next({
        type: MessageType.CONNECT_DEVICE,
        ip: location.ip,
        port: location.port,
        endpoint,
      });
  }

  clear() {
    this.locations = [];
  }
}
