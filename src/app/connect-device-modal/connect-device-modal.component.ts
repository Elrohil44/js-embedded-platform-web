import { Component, OnInit } from '@angular/core';
import {SuiModal} from 'ng2-semantic-ui';
import {ComponentModalConfig, ModalSize} from 'ng2-semantic-ui';

interface IConnectDeviceModal {
  title: string;
  body: string;
}

@Component({
  selector: 'app-connect-device-modal',
  templateUrl: './connect-device-modal.component.html',
  styleUrls: ['./connect-device-modal.component.sass']
})
export class ConnectDeviceModalComponent implements OnInit {
  endpoint = '';

  constructor(public modal: SuiModal<void, string>) { }

  ngOnInit(): void {}

  approveIfCorrect(): void {
    if (this.endpoint.trim()) {
      this.modal.approve(this.endpoint.trim());
    }
  }
}

export class ConnectDeviceModal extends ComponentModalConfig<IConnectDeviceModal, void, string> {
  constructor(title: string, body: string, size = ModalSize.Mini) {
    super(ConnectDeviceModalComponent, { title, body });

    this.isClosable = false;
    this.transition = 'fade';
    this.size = size;
  }
}
