import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from "rxjs"; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: SocketIOClient.Socket; // The client instance of socket.io
  public getMessages: any; 

  constructor() {
    this.getMessages = new Subject(); 
    
    this.socket = io.connect(environment.vmHostPort); // we can also use io.connect() to connect to the current host

    this.socket.on('chat message', (msg) => {
      this.getMessages.next(msg); // send the new message
    });

  }

  sendMessage(msg){
    this.socket.emit('chat message', msg);
  }

}