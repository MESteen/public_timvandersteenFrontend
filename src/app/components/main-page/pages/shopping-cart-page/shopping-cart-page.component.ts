import { Component, OnInit } from '@angular/core';
import {ShopProductModel} from "../../../../models/shop-product.model";
import {ConfirmationDialogService} from "../../../../services/dialog/confirmation-dialog.service";
import {ShoppingCartService} from "../../../../services/shopping-cart.service";
import {UserService} from "../../../../services/user.service";
import {SnackbarService} from "../../../../shared/snackbar.service";

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent implements OnInit {
  cartItems: ShopProductModel[] = [];

  constructor(public confirmationDialogService: ConfirmationDialogService,
              private shoppingCartService: ShoppingCartService,
              private userService: UserService,
              private snackbarService: SnackbarService){ }

  ngOnInit(): void {
    if(this.cartItems.length < 1){
      this.shoppingCartService.setCartItems();
    }
    this.shoppingCartService.getAllCartProducts()
      .subscribe(items => {
        this.cartItems = items;
      });
  }

  IntresseTonenInProducts() {
    if(this.isAuthenticated()){
      this.confirmationDialogService.ShowConfirmationDialog();
    } else {
      this.snackbarService.show('Je bent niet ingelogd', 'danger');
    }

  }

  isAuthenticated() {
    return this.userService.isCurrentUserAuthenticated();
  }
}
