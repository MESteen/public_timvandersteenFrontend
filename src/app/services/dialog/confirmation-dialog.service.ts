import { Injectable } from '@angular/core';
import {PartnerModel} from "../../models/partner.model";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  showConfirmationDialog = false;

  constructor() { }

  ShowConfirmationDialog(){
    this.showConfirmationDialog = true;
  }

  HideConfirmationDialog(){
    this.showConfirmationDialog = false;
  }
}
