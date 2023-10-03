import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
  login(): void {
    // Simula un inicio de sesión exitoso
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout(): void {
    // Simula el cierre de sesión
    this.isAuthenticatedSubject.next(false);
  }

}
