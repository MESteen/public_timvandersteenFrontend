import { Component, OnInit } from '@angular/core';
import {ProductDialogService} from "../../../../services/dialog/product-dialog.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../services/product.service";
import {ShopProductModel} from "../../../../models/shop-product.model";

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {
  addProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public productDialogService: ProductDialogService, private productService: ProductService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.addProductForm = this.formBuilder.group({
      productName: new FormControl(null,[Validators.required]),
      productDescription: new FormControl(null, [Validators.required]),
      productColor: new FormControl(null, [Validators.required]),
      productIcon: new FormControl(null,[Validators.required]),
      productValuta: new FormControl(null, [Validators.required]),
      productPrice: new FormControl(null, [Validators.required]),
      productEenheid: new FormControl(null, [Validators.required]),
    });
  }

  AddProductAction(postData: {productName: string, productDescription: string, productColor: string, productIcon: string, productEenheid: string, productPrice: number}){
    let id = new Date().valueOf().toString();
    let newProduct = new ShopProductModel(0,
      postData.productName,
      postData.productDescription,
      postData.productColor,
      postData.productIcon,
      postData.productEenheid,
      postData.productPrice);

    this.productService.AddSponsorItem(newProduct);

    this.productDialogService.HideAddProductDialog();
  }
}
