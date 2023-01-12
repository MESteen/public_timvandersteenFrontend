import {Component, OnInit} from '@angular/core';
import {OrderModel} from "../../../../models/order.model";
import {OrderService} from "../../../../services/order.service";
import {UserService} from "../../../../services/user.service";


@Component({
  selector: 'app-admin-portal-page',
  templateUrl: './admin-portal-page.component.html',
  styleUrls: ['./admin-portal-page.component.scss']
})
export class AdminPortalPageComponent implements OnInit {
  filterargs = OrderModel;
  ordersList: OrderModel[] = [];

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    if(this.ordersList.length < 1){
      this.orderService.getOrderItems();
    }
    this.GetOrderItems()
  }

  GetOrderItems(): void {
    this.orderService.getAllOrders()
      .subscribe(orders => this.ordersList = orders);
  }

  deleteOrderItemAction(orderEl: OrderModel){
    this.orderService.DeleteOrder(orderEl.orderId);
  }
}
