import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ShopProductModel} from "../models/shop-product.model";


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private allCartItems: BehaviorSubject<ShopProductModel[]> = new BehaviorSubject<ShopProductModel[]>([] as ShopProductModel[]);

  constructor(){}

  getAllCartProducts(): Observable<ShopProductModel[]>{
    return this.allCartItems.asObservable();
  }

  setCartItems(): Observable<ShopProductModel[]>{
    let retrievedObject = localStorage.getItem('cart');
    if (retrievedObject != null) {
      this.allCartItems.next(JSON.parse(retrievedObject) as ShopProductModel[]);
    } else {
      this.allCartItems.next([] as ShopProductModel[]);
    }
    return this.allCartItems.asObservable();
  }

  AddItemToCart(item: ShopProductModel){
    let retrievedObject = localStorage.getItem('cart');

    if (retrievedObject != null) {
      let val =  JSON.parse(retrievedObject) as ShopProductModel[];
      const foundObject = val.some(el => el?.productId === item?.productId);
      if(!foundObject){
        val.push(item);
      }
      localStorage.setItem('cart', JSON.stringify(val));
    } else{
      localStorage.setItem('cart', JSON.stringify([item]));
    }
  }

  deleteCartItemFormList(id: number){
    let cartItems: ShopProductModel[] = [];
    let retrievedObject = localStorage.getItem('cart');
    if (retrievedObject != null) {
      cartItems = JSON.parse(retrievedObject) as ShopProductModel[];
    }

    cartItems.forEach((item,index)=>{
      if(item?.productId == id){
        delete cartItems[index];
      }
    });

    let returnList = this.cleanCartListFromNullValues(cartItems);

    if (returnList[0] == null){
      localStorage.removeItem('cart');
      this.allCartItems.next(returnList);
    } else {
      localStorage.setItem('cart', JSON.stringify(returnList));
      this.allCartItems.next(returnList);
    }

    this.setCartItems();
  }

  deleteAllItemsFromCart(){
    localStorage.removeItem('cart');
    this.allCartItems.next([] as ShopProductModel[]);
  }

  private cleanCartListFromNullValues(cartItems: ShopProductModel[]){
    let returnList: ShopProductModel[] = [];
    cartItems.filter(function (el) {
      if(el != null){
        returnList.push(el);
      }
    });
    return returnList
  }
}
