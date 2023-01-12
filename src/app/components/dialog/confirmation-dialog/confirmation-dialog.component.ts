import { Component, OnInit } from '@angular/core';
import {ConfirmationDialogService} from "../../../services/dialog/confirmation-dialog.service";
import {OrderService} from "../../../services/order.service";
import {ShopProductModel} from "../../../models/shop-product.model";
import {SnackbarService} from "../../../shared/snackbar.service";
import {UserService} from "../../../services/user.service";
import {UserModel} from "../../../models/user.model";
import {Router} from "@angular/router";
import {OrderModel} from "../../../models/order.model";
import {ShoppingCartService} from "../../../services/shopping-cart.service";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  private currentUser!: UserModel;

  constructor(public confirmationDialogService: ConfirmationDialogService,
              private orderService: OrderService,
              private snackbarService: SnackbarService,
              private userService: UserService,
              private route: Router,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.GetCurrentUser()
  }

  GetCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(user => this.currentUser = user);
  }

  SendOrder(){
    let orders: ShopProductModel[] = [];

    this.shoppingCartService.getAllCartProducts().subscribe(items =>{
      orders = items;
    }).unsubscribe();

    if (this.userService.isCurrentUserAuthenticated()){

      if(orders.length > 0){
        let order = new OrderModel(0, this.currentUser.id, "", 0, orders);
        this.orderService.AddOrder(order);
        this.confirmationDialogService.HideConfirmationDialog();
      } else {
        this.snackbarService.show('Er ging iets fout', 'danger');
      }
    } else {
      this.snackbarService.show('U bent nog niet ingelogd', 'danger');
      this.route.navigate(['/account']);
    }
  }
}
