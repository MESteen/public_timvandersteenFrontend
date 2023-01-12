import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HomePageComponent } from './components/main-page/pages/home-page/home-page.component';
import { AboutPageComponent } from './components/main-page/pages/about-page/about-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { PartnersPageComponent } from './components/main-page/pages/partners-page/partners-page.component';
import { TeamPageComponent } from './components/main-page/pages/team-page/team-page.component';
import { CoachObjComponent } from './components/main-page/pages/team-page/coach-obj/coach-obj.component';
import { PartnerItemComponent } from './components/main-page/pages/partners-page/partner-item/partner-item.component';
import { SchedulePageComponent } from './components/main-page/pages/schedule-page/schedule-page.component';
import { UpcomingGameItemComponent } from './components/main-page/pages/schedule-page/upcoming-game-item/upcoming-game-item.component';
import { SponsoringPageComponent } from './components/main-page/pages/sponsoring-page/sponsoring-page.component';
import { SponsorItemComponent } from './components/main-page/pages/sponsoring-page/sponsor-item/sponsor-item.component';

//fontawesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { ShoppingCartPageComponent } from './components/main-page/pages/shopping-cart-page/shopping-cart-page.component';
import { CartItemComponent } from './components/main-page/pages/shopping-cart-page/cart-item/cart-item.component';
import { NotFoundComponent } from './components/main-page/pages/not-found/not-found.component';

//Dialogs
import { EditProductDialogComponent } from './components/dialog/edits/edit-product-dialog/edit-product-dialog.component';
import { EditScheduleItemDialogComponent } from './components/dialog/edits/edit-schedule-item-dialog/edit-schedule-item-dialog.component';
import { AddScheduleDialogComponent } from './components/dialog/adds/add-schedule-dialog/add-schedule-dialog.component';
import { AddProductDialogComponent } from './components/dialog/adds/add-product-dialog/add-product-dialog.component';
import { LoginRegistrationComponent } from './components/main-page/pages/login-registration/login-registration.component';
import { SnackbarComponent } from './components/extra/snackbar/snackbar.component';
import { AddPartnerDialogComponent } from './components/dialog/adds/add-partner-dialog/add-partner-dialog.component';
import { EditPartnerDialogComponent } from './components/dialog/edits/edit-partner-dialog/edit-partner-dialog.component';
import { ConfirmationDialogComponent } from './components/dialog/confirmation-dialog/confirmation-dialog.component';
import { AdminPortalPageComponent } from './components/main-page/pages/admin-portal-page/admin-portal-page.component';
import { OrderUserComponent } from './components/main-page/pages/admin-portal-page/order-user/order-user.component';
import {RoleGuardService} from "./shared/auth/role-guard.service";
import {AuthGuardService} from "./shared/auth/auth-guard.service";
import {AuthService} from "./shared/auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    HomePageComponent,
    AboutPageComponent,
    FooterComponent,
    PartnersPageComponent,
    TeamPageComponent,
    CoachObjComponent,
    PartnerItemComponent,
    SchedulePageComponent,
    UpcomingGameItemComponent,
    SponsoringPageComponent,
    SponsorItemComponent,
    ShoppingCartPageComponent,
    CartItemComponent,
    NotFoundComponent,
    EditProductDialogComponent,
    EditScheduleItemDialogComponent,
    AddScheduleDialogComponent,
    AddProductDialogComponent,
    LoginRegistrationComponent,
    SnackbarComponent,
    AddPartnerDialogComponent,
    EditPartnerDialogComponent,
    ConfirmationDialogComponent,
    AdminPortalPageComponent,
    OrderUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
