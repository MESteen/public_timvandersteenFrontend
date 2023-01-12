import {ShopProductModel} from "./shop-product.model";

export class OrderModel{

  constructor(public orderId: number,
              public userId: number,
              public createdDatum: string,
              public totalPrice: number,
              public orderItems: ShopProductModel[],){}
}
