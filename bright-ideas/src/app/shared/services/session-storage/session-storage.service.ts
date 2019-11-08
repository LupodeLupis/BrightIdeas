import { Injectable } from '@angular/core';
import { User } from '../../../models/user';




const KEY_AS_USER = 'currentUser';

export class SessionStorageService {

  constructor() { }

  removeUserfromSessionStorage() {
    window.sessionStorage.removeItem(KEY_AS_USER);
    window.sessionStorage.clear();
  }

  saveUserInSessionStorage() {
    window.sessionStorage.removeItem(KEY_AS_USER);
  }

  getUserFromSessionStorage(): User {
    return JSON.parse(sessionStorage.getItem(KEY_AS_USER));
  }
}
