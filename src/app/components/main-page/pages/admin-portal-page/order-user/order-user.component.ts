import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/user.service";
import {UserModel} from "../../../../../models/user.model";

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.scss']
})
export class OrderUserComponent implements OnInit {
  @Input() userId!: number;
  user: UserModel = {} as UserModel;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if(this.userId > 1 && !this.user?.username){
      this.userService.getUserById(this.userId).subscribe(data => {
        this.user = data;
      });
    }
  }
}
