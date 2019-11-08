

const KEY_AS_USER = 'currentUser';

export class LocalStorageService {

  constructor() { }

  removeUserfromLocalStorage() {
    window.localStorage.removeItem(KEY_AS_USER);
    window.localStorage.clear();
  }
  saveUserInLocalStorage(user: string) {
    window.localStorage.removeItem(KEY_AS_USER);
    window.localStorage.setItem(KEY_AS_USER, user);
  }
  getUserFromLocalStorage(): object {
    return JSON.parse(localStorage.getItem(KEY_AS_USER));
  }
}
