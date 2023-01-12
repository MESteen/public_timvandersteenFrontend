import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "../shared/http.service";
import {SnackbarService} from "../shared/snackbar.service";
import {OrderModel} from "../models/order.model";
import {ShopProductModel} from "../models/shop-product.model";
import {ShoppingCartService} from "./shopping-cart.service";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private allOrders: BehaviorSubject<OrderModel[]> = new BehaviorSubject<OrderModel[]>([] as OrderModel[]);

  private orderUrl = '/order';
  private addOrderUrl = '/order/add';
  private deleteOrderUrl = '/order/delete/{orderId}';

  constructor(private http: HttpService, private snackbarService: SnackbarService, private shoppingCartService: ShoppingCartService){}

  getAllOrders(): Observable<OrderModel[]>{
    return this.allOrders.asObservable();
  }

  getOrderItems(): Observable<OrderModel[]> {
    this.http.getWithAuth<OrderModel[]>(this.orderUrl + '/all').subscribe(data => {
      let orders = data as never[];
      this.allOrders.next(orders);
    });
    return this.allOrders.asObservable();
  }

  //POST
  AddOrder(order: OrderModel) {
    let jsonObj = this.createDtoObject(order);
    return this.http.postJSON(this.addOrderUrl, JSON.stringify(jsonObj)).subscribe(data => {
      this.getOrderItems();

      this.shoppingCartService.deleteAllItemsFromCart();
      this.snackbarService.show("Order toegevoegd", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  DeleteOrder(orderId: number) {
    return this.http.delete(this.deleteOrderUrl.replace('{orderId}', orderId.toString())).subscribe( data => {
      this.getOrderItems();
      this.snackbarService.show("Order verwijderd", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  private createDtoObject(order: OrderModel) {
    let jsonObj = {
      "userId": order.userId,
      "orderItems": this.createProductsDtoListObject(order.orderItems),
    }

    return jsonObj;
  }

  private createProductsDtoListObject(products: ShopProductModel[]) {
    let jsonListObj: any[] = [];
    products.forEach(product => {
      let productDto = {
        "name": product.name,
        "beschrijving": product.beschrijving,
        "kleur": product.kleur,
        "icon": product.icon,
        "eenheid": product.eenheid,
        "price": product.price
      }
      jsonListObj.push(productDto);
    })

    return jsonListObj;
  }
}
