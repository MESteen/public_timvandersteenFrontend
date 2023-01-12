import { Injectable } from '@angular/core';
import {ShopProductModel} from "../../models/shop-product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductDialogService {
  showEditProductDialog = false;
  showAddProductDialog = false;
  productToEdit!: ShopProductModel;
  constructor() { }

  ShowEditProductDialog(product: ShopProductModel){
    this.productToEdit = product;
    this.showEditProductDialog = true;
  }

  HideEditProductDialog(){
    this.showEditProductDialog = false;
  }

  ShowAddProductDialog(){
    this.showAddProductDialog = true;
  }

  HideAddProductDialog(){
    this.showAddProductDialog = false;
  }
}
