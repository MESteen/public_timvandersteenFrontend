import { Injectable } from '@angular/core';
import {ShopProductModel} from "../models/shop-product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "../shared/http.service";
import {SnackbarService} from "../shared/snackbar.service";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private allProducts: BehaviorSubject<ShopProductModel[]> = new BehaviorSubject<ShopProductModel[]>([] as ShopProductModel[]);

  private productUrl = '/product';
  private addProductUrl = '/product/add';
  private editProductUrl = '/product/edit/{productId}';
  private deleteProductUrl = '/product/delete/{productId}';

  constructor(private http: HttpService, private snackbarService: SnackbarService){}

  getAllProducts(): Observable<ShopProductModel[]>{
    return this.allProducts.asObservable();
  }

  getSponsorItems(): Observable<ShopProductModel[]> {
    this.http.get<ShopProductModel[]>(this.productUrl + '/all').subscribe(data => {
      let products = data as never[];
      this.allProducts.next(products);
    });
    return this.allProducts.asObservable();
  }

  //POST
  AddSponsorItem(product: ShopProductModel) {
    let jsonObj = this.createDtoObject(product);
    return this.http.postJSON(this.addProductUrl, JSON.stringify(jsonObj)).subscribe(data => {
      this.getSponsorItems();
      this.snackbarService.show("Product toegevoegd", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  //PUT
  EditProduct(product: ShopProductModel) {
    let jsonObj = this.createDtoObject(product);
    return this.http.putJSON(this.editProductUrl.replace('{productId}', product.productId.toString()), JSON.stringify(jsonObj)).subscribe(data => {
      this.getSponsorItems();
      this.snackbarService.show("Product aangepast", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  //DELETE
  DeleteSponsorItem(productId: number) {
    return this.http.delete(this.deleteProductUrl.replace('{productId}', productId.toString())).subscribe( data => {
      this.getSponsorItems();
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  private createDtoObject(product: ShopProductModel) {
    let jsonObj = {
      "name": product.name,
      "beschrijving": product.beschrijving,
      "kleur": product.kleur,
      "icon": product.icon,
      "eenheid": product.eenheid,
      "price": product.price
    }

    return jsonObj;
  }
}
