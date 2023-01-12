import {Component, Input, OnInit} from '@angular/core';
import {ShopProductModel} from "../../../../../models/shop-product.model";
import {ProductService} from "../../../../../services/product.service";
import {ProductDialogService} from "../../../../../services/dialog/product-dialog.service";
import {ShoppingCartService} from "../../../../../services/shopping-cart.service";
import {UserService} from "../../../../../services/user.service";

@Component({
  selector: 'app-sponsor-item',
  templateUrl: './sponsor-item.component.html',
  styleUrls: ['./sponsor-item.component.scss']
})
export class SponsorItemComponent implements OnInit {
  @Input() sponsorItem!: ShopProductModel;

  constructor(private productService: ProductService, public productDialogService: ProductDialogService, private shoppingCartService: ShoppingCartService, private userService: UserService) {}

  ngOnInit(): void {
  }

  AddItemToCart(item: ShopProductModel){
    this.shoppingCartService.AddItemToCart(item);
  }

  DeleteProductItem(id: number){
    this.productService.DeleteSponsorItem(id);
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
