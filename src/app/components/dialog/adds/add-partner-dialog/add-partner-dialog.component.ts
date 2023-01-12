import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopProductModel} from "../../../../models/shop-product.model";
import {PartnerService} from "../../../../services/partner.service";
import {PartnerDialogService} from "../../../../services/dialog/partner-dialog.service";
import {PartnerModel} from "../../../../models/partner.model";

@Component({
  selector: 'app-add-partner-dialog',
  templateUrl: './add-partner-dialog.component.html',
  styleUrls: ['./add-partner-dialog.component.scss']
})
export class AddPartnerDialogComponent implements OnInit {

  addPartnerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public partnerDialogService: PartnerDialogService, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.addPartnerForm = this.formBuilder.group({
      partnerNaam: new FormControl(null,[Validators.required]),
      partnerLink: new FormControl(null, [Validators.required]),
      partnerImage: new FormControl(null, [Validators.required]),
    });
  }

  AddPartnerAction(postData: {partnerNaam: string, partnerLink: string, partnerImage: string}){
    let newPartner = new PartnerModel(
      0,
      postData.partnerNaam,
      postData.partnerImage,
      postData.partnerLink,
    );

    this.partnerService.AddPartnerItem(newPartner);

    this.partnerDialogService.HideAddPartnerDialog();
  }

}
