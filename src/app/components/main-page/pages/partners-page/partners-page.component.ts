import { Component, OnInit } from '@angular/core';
import {PartnerModel} from "../../../../models/partner.model";
import {PartnerService} from "../../../../services/partner.service";
import {PartnerDialogService} from "../../../../services/dialog/partner-dialog.service";
import {UserService} from "../../../../services/user.service";
import {UserModel} from "../../../../models/user.model";

@Component({
  selector: 'app-partners-page',
  templateUrl: './partners-page.component.html',
  styleUrls: ['./partners-page.component.scss']
})
export class PartnersPageComponent implements OnInit {
  partnersList: PartnerModel[] = [];
  private currentUser!: UserModel;

  constructor(private partnerService: PartnerService, public partnerDialogService: PartnerDialogService, private userService: UserService) { }

  ngOnInit(): void {
    if(this.partnersList.length < 1){
      this.partnerService.getPartnerItems();
    }
    this.GetScheduleItems()
  }

  GetScheduleItems(): void {
    this.partnerService.getAllPartners()
      .subscribe(partners => this.partnersList = partners);
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
