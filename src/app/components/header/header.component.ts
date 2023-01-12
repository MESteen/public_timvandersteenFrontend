import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private currentUser!: UserModel;

  constructor(private userService: UserService, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.GetCurrentUser()
  }

  GetCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }

  isCurrentUserEmpty() {
    let username = this.currentUser?.username;
    let email = this.currentUser?.email;
    return (!username || username.length === 0 ) && (!email || email.length === 0 );
  }

  LogOff(){
    localStorage.removeItem('user');
    this.userService.clearCurrentUser();
    this.snackbarService.show('Je bent uitgelogd', 'danger' );
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
