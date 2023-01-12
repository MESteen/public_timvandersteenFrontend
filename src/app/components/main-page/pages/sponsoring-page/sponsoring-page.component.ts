import { Component, OnInit } from '@angular/core';
import {ShopProductModel} from "../../../../models/shop-product.model";
import {ProductService} from "../../../../services/product.service";
import {ProductDialogService} from "../../../../services/dialog/product-dialog.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-sponsoring-page',
  templateUrl: './sponsoring-page.component.html',
  styleUrls: ['./sponsoring-page.component.scss']
})
export class SponsoringPageComponent implements OnInit {
  sponsorItems: ShopProductModel[] = [];

  constructor(private productService: ProductService, public productDialogService: ProductDialogService, private userService: UserService) {}

  ngOnInit(): void {
    if(this.sponsorItems.length < 1){
      this.productService.getSponsorItems();
    }
    this.GetSponsorItems()

  }

  GetSponsorItems(): void {
    this.productService.getAllProducts()
      .subscribe(product => this.sponsorItems = product);
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
