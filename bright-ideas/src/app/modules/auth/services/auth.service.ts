import { Injectable } from '@angular/core';
import { User } from '../../../models/user';
import { Subject, Observable, Observer } from 'rxjs';
import { SessionStorageService } from '../../../shared/services/session-storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSource$ = new Subject<User>();
  constructor( private sessionStorageService: SessionStorageService) { }


  getUserSource$() {
    return this.userSource$.asObservable();
  }
  setUser(user: User): void {
    console.log(user);
    this.userSource$.next(user);
  }

  me(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const user: User = this.sessionStorageService.getUser();
      if (!user) {
        return  observer.complete();
      }
      observer.next(user);
    });
  }
}
