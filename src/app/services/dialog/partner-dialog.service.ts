import { Injectable } from '@angular/core';
import {PartnerModel} from "../../models/partner.model";

@Injectable({
  providedIn: 'root'
})
export class PartnerDialogService {
  showEditPartnerDialog = false;
  showAddPartnerDialog = false;
  partnerToEdit!: PartnerModel;
  constructor() { }

  ShowEditPartnerDialog(partner: PartnerModel){
    this.partnerToEdit = partner;
    this.showEditPartnerDialog = true;
  }

  HideEditPartnerDialog(){
    this.showEditPartnerDialog = false;
  }

  ShowAddPartnerDialog(){
    this.showAddPartnerDialog = true;
  }

  HideAddPartnerDialog(){
    this.showAddPartnerDialog = false;
  }
}
