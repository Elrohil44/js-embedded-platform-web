import { Component, Input, OnInit } from '@angular/core';
import { LwM2MObject } from '../models/objects';
import { DeviceService } from '../device.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-object-container',
  templateUrl: './object-container.component.html',
  styleUrls: ['./object-container.component.sass']
})
export class ObjectContainerComponent implements OnInit {
  @Input() object: LwM2MObject;
  @Input() endpoint: string;

  constructor(
    private deviceService: DeviceService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {  }

  createInstance(): void {

  }

  onRead(resourcePath) {
    const sub = this.deviceService
      .read(this.endpoint, `/${this.object.id}/${resourcePath}`)
      .subscribe((msg) => {
        sub.unsubscribe();
        const now = new Date();
        const path: Number[] = msg.resource.split('/').filter(Boolean).map(Number);
        if (path[0] !== this.object.id) {
          console.log(this.object.id, path[0], path);
          this.messageService.add({
            class: 'error',
            content: 'Unexpected response from server',
          });
        }
        if (path.length === 1) { return; }

        const instance = this.object.instances.find(i => i.id === path[1]);

        if (!instance) { return; }

        const resource = instance.resources.find(r => r.id === path[2]);

        if (resource) {
          Object.assign(resource, {
            value: msg.data,
            error: msg.error,
            message: msg.message,
            updatedAt: now,
          });
        } else {
          if (typeof msg.data === 'object') {
            Object.keys(msg.data).map(Number).forEach(key => {
              const resObj = instance.resources.find(r => r.id === key);
              if (resObj) {
                Object.assign(resObj, { value: msg.data[key], updatedAt: now, message: msg.message, error: msg.error });
              }
            });
          }
        }
      });
  }
}
