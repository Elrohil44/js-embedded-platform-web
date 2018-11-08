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

  constructor() { }

  getDevice(endpoint: string): Device {
    return this.devices.find(device => device.endpoint === endpoint);
  }
}
