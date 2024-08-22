import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authSubject = new BehaviorSubject<boolean>(false);
  auth$ = this.authSubject.asObservable();

  setAuthStatus(authenticated: boolean): void {
    this.authSubject.next(authenticated);
  }

  getAuthStatus(): boolean {
    return this.authSubject.value;
  }
}
