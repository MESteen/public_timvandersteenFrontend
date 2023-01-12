import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { Routes } from '@angular/router';
import {HomePageComponent} from "./components/main-page/pages/home-page/home-page.component";
import {AboutPageComponent} from "./components/main-page/pages/about-page/about-page.component";
import {TeamPageComponent} from "./components/main-page/pages/team-page/team-page.component";
import {PartnersPageComponent} from "./components/main-page/pages/partners-page/partners-page.component";
import {SchedulePageComponent} from "./components/main-page/pages/schedule-page/schedule-page.component";
import {SponsoringPageComponent} from "./components/main-page/pages/sponsoring-page/sponsoring-page.component";
import {ShoppingCartPageComponent} from "./components/main-page/pages/shopping-cart-page/shopping-cart-page.component";
import {NotFoundComponent} from "./components/main-page/pages/not-found/not-found.component";
import {LoginRegistrationComponent} from "./components/main-page/pages/login-registration/login-registration.component";
import {AdminPortalPageComponent} from "./components/main-page/pages/admin-portal-page/admin-portal-page.component";

import {
  AuthGuardService as AuthGuard
} from './shared/auth/auth-guard.service';
import {
  RoleGuardService as RoleGuard
} from './shared/auth/role-guard.service';
import {AuthService} from "./shared/auth/auth.service";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'team', component: TeamPageComponent},
  {path: 'sponsoring', component: SponsoringPageComponent},
  {path: 'partners', component: PartnersPageComponent},
  {path: 'schedule', component: SchedulePageComponent},
  {path: 'cart', component: ShoppingCartPageComponent},
  {path: 'account', component: LoginRegistrationComponent},
  {path: 'admin-portal', component: AdminPortalPageComponent, canActivate: [RoleGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }  },
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  providers: [AuthGuard, RoleGuard, AuthService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
