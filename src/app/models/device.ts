import { LwM2MObject } from './objects';

export class Device {
  endpoint: string;
  registeredAt: Date;
  updatedAt: Date;
  objects: LwM2MObject[] = [];
}
