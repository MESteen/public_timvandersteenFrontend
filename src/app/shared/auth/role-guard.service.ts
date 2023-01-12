import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from "jwt-decode";

@Injectable({providedIn: 'root'})
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['expectedRole'];
    const user = JSON.parse(<string>localStorage.getItem('user'));

    if(user != null){
      const tokenPayload: any = decode(user?.token);

      if (
        !this.auth.isAuthenticated() ||
        !this.hasExpectedRole(tokenPayload.roles, expectedRole)
      ) {
        this.router.navigate(['not-found']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['not-found']);
      return false;
    }
  }

  private hasExpectedRole(tokenPayloadRole: string, expectedRole: string): boolean{

    let hasExpectedRole = false;
    const userRoles = tokenPayloadRole.split(",");

    userRoles.forEach(role => {
      if(role === expectedRole){
        hasExpectedRole = true;
      }
    })
    return hasExpectedRole;
  }
}
