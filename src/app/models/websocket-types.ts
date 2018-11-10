import {DeviceLocation} from './device-location';
import {Device} from './device';

export enum MessageType {
  SUB_DEVICE_LIST = 'SUB_DEVICE_LIST',
  SUB_DEVICE_LOCATIONS = 'SUB_DEVICE_LOCATIONS',
  UNSUB_DEVICE_LIST = 'UNSUB_DEVICE_LIST',
  UNSUB_DEVICE_LOCATIONS = 'UNSUB_DEVICE_LOCATIONS',
  DEVICE_LIST = 'DEVICE_LIST',
  DEVICE_LOCATIONS = 'DEVICE_LOCATIONS',
  CONNECT_DEVICE = 'CONNECT_DEVICE',
  GET_DEVICE = 'GET_DEVICE',
  DEVICE = 'DEVICE',
  ERROR = 'ERROR',
  UNSUPPORTED_TYPE = 'UNSUPPORTED_TYPE',
  NOOP = 'NOOP',
}

export class WebSocketMessage {
  type: MessageType;
  message?: string;
  deviceLocations?: DeviceLocation[];
  devices?: Device[];
  device?: Device;
  endpoint?: string;
  ip?: string;
  port?: number;
}
