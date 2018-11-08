import { Injectable } from '@angular/core';
import { Message } from './models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  add(message: Message) {
    const lastMessage: Message = this.messages[0];
    message.id = lastMessage ? lastMessage.id + 1 : 0;
    this.messages.unshift(message);
  }

  removeMessage(message: Message | number) {
    const id: number = typeof message === 'number'
      ? message
      : message.id;
    this.messages = this.messages.filter(msg => msg.id !== id);
  }

  clear() {
    this.messages = [];
  }
}
