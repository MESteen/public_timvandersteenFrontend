import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PartnerDialogService} from "../../../../services/dialog/partner-dialog.service";
import {PartnerService} from "../../../../services/partner.service";
import {PartnerModel} from "../../../../models/partner.model";

@Component({
  selector: 'app-edit-partner-dialog',
  templateUrl: './edit-partner-dialog.component.html',
  styleUrls: ['./edit-partner-dialog.component.scss']
})
export class EditPartnerDialogComponent implements OnInit {

  editPartnerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public partnerDialogService: PartnerDialogService, private partnerService: PartnerService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.editPartnerForm = this.formBuilder.group({
      partnerNaam: new FormControl(null,[Validators.required]),
      partnerLink: new FormControl(null, [Validators.required]),
      partnerImage: new FormControl(null, [Validators.required]),
    });
  }

  EditPartnerAction(postData: {partnerNaam: string, partnerLink: string, partnerImage: string}){
    let editedPartner = new PartnerModel(
      this.partnerDialogService.partnerToEdit.partnerId,
      postData.partnerNaam ?? this.partnerDialogService.partnerToEdit.brand,
      postData.partnerImage ?? this.partnerDialogService.partnerToEdit.image,
      postData.partnerLink ?? this.partnerDialogService.partnerToEdit.href,
    );

    this.partnerService.EditPartner(editedPartner);

    this.partnerDialogService.HideEditPartnerDialog();
  }

}
