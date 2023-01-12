import {Component, Input, OnInit} from '@angular/core';
import {PartnerModel} from "../../../../../models/partner.model";
import {PartnerService} from "../../../../../services/partner.service";
import {PartnerDialogService} from "../../../../../services/dialog/partner-dialog.service";
import {UserService} from "../../../../../services/user.service";

@Component({
  selector: 'app-partner-item',
  templateUrl: './partner-item.component.html',
  styleUrls: ['./partner-item.component.scss']
})
export class PartnerItemComponent implements OnInit {
  @Input() partner!: PartnerModel;
  adminUser: boolean = true;

  constructor(private partnerService: PartnerService, public partnerDialogService: PartnerDialogService, private userService: UserService) { }

  ngOnInit(): void {
  }

  DeletePartner(partnerId: number){
    this.partnerService.DeletePartner(partnerId);
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
