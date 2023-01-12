import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    return !this.jwtHelper.isTokenExpired(user.token);
  }
}
