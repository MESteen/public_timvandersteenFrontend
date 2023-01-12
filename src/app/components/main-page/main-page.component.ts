import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if(!(!user?.username || user?.username.length === 0)){
      this.userService.setCurrentUser(); //Refresh user als gebruiker even wegwas bijv
    }
  }

}
