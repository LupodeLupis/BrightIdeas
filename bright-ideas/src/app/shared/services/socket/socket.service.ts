import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: SocketIOClient.Socket;
  private socketUrl: string;


  constructor( private sessionStorageSerice: SessionStorageService) {
    console.log(environment.production)
    this.socketUrl = `https://:${window.location.port}`
  }

  listenForNotification(): Observable <any> {
    return Observable.create((observer: any) => {
      const user: User  =  this.sessionStorageSerice.getUser();
      console.log(user)
      this.socket = io(this.socketUrl);
      this.socket.on(`${user.userID}-notification`, (message: any) => {
        observer.next(message);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
