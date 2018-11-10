import { Injectable, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/internal/observable/dom/webSocket';
import { MessageType, WebSocketMessage } from './models/websocket-types';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocketSubject<WebSocketMessage> = webSocket('ws://127.0.0.1:60606');
  errorObserver = this.webSocket
    .multiplex(
      () => ({ type: MessageType.NOOP }),
      () => ({ type: MessageType.NOOP }),
      (msg) => msg.type === MessageType.ERROR)
    .subscribe(msg => {
      if (msg.type === MessageType.ERROR) {
        this.messageService.add({
          class: 'error',
          content: msg.message,
        });
      }
    });

  constructor(private messageService: MessageService) { }

}
