import {Component, Input, OnInit} from '@angular/core';
import {LwM2MObjectInstance, Permission} from '../models/objects';

@Component({
  selector: 'app-instance-container',
  templateUrl: './instance-container.component.html',
  styleUrls: ['./instance-container.component.sass']
})
export class InstanceContainerComponent implements OnInit {
  @Input() instance: LwM2MObjectInstance;

  constructor() { }

  ngOnInit() {
  }

  getIcon(permission: Permission): string {
    switch (permission) {
      case Permission.READABLE:
        return 'book';
      case Permission.WRITABLE:
        return 'cloud upload';
      case Permission.EXECUTABLE:
        return 'gear';
      case Permission.DELETABLE:
        return 'trashcan';
      default:
        return 'alert';
    }
  }

  getActionName(permission: Permission): string {
    switch (permission) {
      case Permission.READABLE:
        return 'Read';
      case Permission.WRITABLE:
        return 'Write';
      case Permission.EXECUTABLE:
        return 'Execute';
      case Permission.DELETABLE:
        return 'Delete';
      default:
        return 'No action';
    }
  }
}
