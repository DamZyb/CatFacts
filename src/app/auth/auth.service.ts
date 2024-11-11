import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor() {
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


}