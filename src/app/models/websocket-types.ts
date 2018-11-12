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
  READ = 'READ',
  READ_RESPONSE = 'READ_RESPONSE',
  READ_ERROR = 'READ_ERROR',
  ERROR = 'ERROR',
  UNSUPPORTED_TYPE = 'UNSUPPORTED_TYPE',
  RESTART = 'RESTART',
  UPDATE_FIRMWARE = 'UPDATE_FIRMWARE',
  NOOP = 'NOOP',
}

export class WebSocketMessage {
  type: MessageType;
  message?: string;
  deviceLocations?: DeviceLocation[];
  devices?: Device[];
  device?: Device;
  data?: any;
  error?: string;
  endpoint?: string;
  resource?: string;
  ip?: string;
  port?: number;
}
