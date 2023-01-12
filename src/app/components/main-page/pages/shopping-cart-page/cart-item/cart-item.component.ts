import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ShopProductModel} from "../../../../../models/shop-product.model";
import {ShoppingCartService} from "../../../../../services/shopping-cart.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: ShopProductModel;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  deleteCartItemAction(id: number){
    this.shoppingCartService.deleteCartItemFormList(id);
  }

}
