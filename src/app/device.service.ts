import { Injectable } from '@angular/core';
import { Device } from './models/device';
import {
  DeviceObject,
  DeviceObjectInstance,
  FirmwareUpdateObject,
  FirmwareUpdateObjectInstance,
  ServerObject,
  ServerObjectInstance
} from './models/objects';
import { MessageType, WebSocketMessage } from './models/websocket-types';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout, timeoutWith } from 'rxjs/internal/operators';
import { MessageService } from './message.service';
import { WebSocketService } from './websocket.service';

const mockDevice = new Device();

const mockServerObject = new ServerObject();
const mockServerObjectInstance = new ServerObjectInstance();
mockServerObject.instances.push(mockServerObjectInstance);

const mockDeviceObject = new DeviceObject();
const mockDeviceObjectInstance = new DeviceObjectInstance();
mockDeviceObject.instances.push(mockDeviceObjectInstance);

const mockFirmwareUpdateObject = new FirmwareUpdateObject();
const mockFirmwareUpdateObjectInstance = new FirmwareUpdateObjectInstance();
mockFirmwareUpdateObject.instances.push(mockFirmwareUpdateObjectInstance);

mockDevice.endpoint = 'mockEndpoint';
mockDevice.updatedAt = new Date();
mockDevice.registeredAt = new Date('2018-11-01T20:23:12Z');
mockDevice.objects.push(
  mockServerObject,
  mockDeviceObject,
  mockFirmwareUpdateObject,
);

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  devices: Device[] = [mockDevice];

  constructor(
    private webSocketService: WebSocketService,
    private messageService: MessageService,
  ) { }

  getDevice(endpoint: string): Observable<Device> {
    return this.webSocketService.webSocket.multiplex(
      () => ({ type: MessageType.GET_DEVICE, endpoint }),
      () => ({ type: MessageType.NOOP }),
      (msg: WebSocketMessage) => msg.type === MessageType.DEVICE
        && msg.device && msg.device.endpoint === endpoint)
      .pipe(
        timeout(5000),
        catchError((err) => {
          this.messageService.add({
            class: 'error',
            content: err.message || 'Could not connect to WebSocket, make sure it is running',
          });
          return of({
            type: MessageType.DEVICE,
            device: null,
          } as WebSocketMessage);
        }),
        map(msg => msg.device),
      );
  }

  getDevices(): Observable<Device[]> {
    return this.webSocketService.webSocket.multiplex(
      () => ({ type: MessageType.SUB_DEVICE_LIST }),
      () => ({ type: MessageType.UNSUB_DEVICE_LIST }),
      (msg: WebSocketMessage) => msg.type === MessageType.DEVICE_LIST)
      .pipe(
        catchError((err) => {
          this.messageService.add({
            class: 'error',
            content: err.message || 'Could not connect to WebSocket, make sure it is running',
          });
          return of({
            type: MessageType.DEVICE_LIST,
            devices: [],
          } as WebSocketMessage);
        }),
        map(msg => msg.devices),
      );
  }

  read(endpoint: string, resource: string): Observable<WebSocketMessage> {
    return this.webSocketService.webSocket.multiplex(
      () => ({ type: MessageType.READ, endpoint, resource }),
      () => ({ type: MessageType.NOOP }),
      (msg: WebSocketMessage) => (msg.type === MessageType.READ_RESPONSE || msg.type === MessageType.READ_ERROR)
       && msg.endpoint === endpoint && msg.resource === resource
    ).pipe(
      timeoutWith(5000, of({
        type: MessageType.READ_ERROR,
        message: 'Timeout',
        error: 'Error',
      } as WebSocketMessage)),
      catchError((err => {
        this.messageService.add({
          class: 'error',
          content: err.message || 'Could not connect to WebSocket, make sure it is running',
        });
        return of({
          type: MessageType.READ_ERROR,
          message: err.message || 'Could not connect to WebSocket',
        } as WebSocketMessage);
      }),
    ));
  }

  restart(endpoint: string): void {
    this.webSocketService.webSocket.next({
      type: MessageType.RESTART,
      endpoint,
    });
  }

  updateFirmware(endpoint: string): void {
    this.webSocketService.webSocket.next({
      type: MessageType.UPDATE_FIRMWARE,
      endpoint,
    });
  }
}
