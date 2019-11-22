import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { Posting } from 'src/app/models/posting';
import { Subject } from 'rxjs';


const KEY_AS_USER = 'currentUser';
const KEY_AS_POSITION = 'currentpositions';

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService {

  private userSource$ = new Subject<string>()
  constructor() { }

    // setUser(user: string): void {
    //   this.userSource$.next(user);
    // }
  removeUser() {
    window.sessionStorage.removeItem(KEY_AS_USER);
    window.sessionStorage.clear();
  }
  getUser(): User {
    return JSON.parse(sessionStorage.getItem(KEY_AS_USER));
  }
  saveUser(user: string) {
    window.sessionStorage.removeItem(KEY_AS_USER);
    window.sessionStorage.setItem(KEY_AS_USER, JSON.stringify(user));
  }
  savePositions(positions: Posting[]) {
   window.sessionStorage.setItem(KEY_AS_POSITION, JSON.stringify(positions));
  }
  removePositions() {
    window.sessionStorage.removeItem(KEY_AS_POSITION);
  }
  getPositions(): Posting[] {
    return JSON.parse(sessionStorage.getItem(KEY_AS_POSITION));
  }
  clearAll() {
    sessionStorage.clear();
  }
}
