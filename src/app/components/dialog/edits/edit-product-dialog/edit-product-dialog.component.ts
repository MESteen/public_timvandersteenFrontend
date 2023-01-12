import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopProductModel} from "../../../../models/shop-product.model";
import {ProductService} from "../../../../services/product.service";
import {ProductDialogService} from "../../../../services/dialog/product-dialog.service";

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss']
})
export class EditProductDialogComponent implements OnInit {
  editProductForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public productDialogService: ProductDialogService, private productService: ProductService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }
  createFormGroup() {
    this.editProductForm = this.formBuilder.group({
      productName: new FormControl(null,[Validators.required]),
      productDescription: new FormControl(null, [Validators.required]),
      productColor: new FormControl(null, [Validators.required]),
      productIcon: new FormControl(null,[Validators.required]),
      productValuta: new FormControl(null, [Validators.required]),
      productPrice: new FormControl(null, [Validators.required]),
      productEenheid: new FormControl(null, [Validators.required]),
    });
  }

  editProductAction(postData: {productName: string, productDescription: string, productColor: string, productIcon: string, productEenheid: string, productPrice: number}){
    let editedProduct = new ShopProductModel(
      this.productDialogService.productToEdit.productId,
      postData.productName ?? this.productDialogService.productToEdit.name,
      postData.productDescription ?? this.productDialogService.productToEdit.beschrijving,
      postData.productColor ?? this.productDialogService.productToEdit.kleur,
      postData.productIcon ?? this.productDialogService.productToEdit.icon,
      postData.productEenheid ?? this.productDialogService.productToEdit.eenheid,
      postData.productPrice ?? this.productDialogService.productToEdit.price,
    );

    this.productService.EditProduct(editedProduct)

    this.productDialogService.HideEditProductDialog();
  }

}
