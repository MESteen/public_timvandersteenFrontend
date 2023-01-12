import { Component, OnInit } from '@angular/core';
import {ScheduleDialogService} from "../../../../services/dialog/schedule-dialog.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductDialogService} from "../../../../services/dialog/product-dialog.service";
import {ProductService} from "../../../../services/product.service";
import {ShopProductModel} from "../../../../models/shop-product.model";
import {ScheduleService} from "../../../../services/schedule.service";
import {UpcomingGameModel} from "../../../../models/upcoming-game.model";

@Component({
  selector: 'app-add-schedule-dialog',
  templateUrl: './add-schedule-dialog.component.html',
  styleUrls: ['./add-schedule-dialog.component.scss']
})
export class AddScheduleDialogComponent implements OnInit {

  addScheduleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public scheduleDialogService: ScheduleDialogService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.addScheduleForm = this.formBuilder.group({
      courseName: new FormControl(null,[Validators.required]),
      wedstrijdName: new FormControl(null, [Validators.required]),
      aantalDagen: new FormControl(null, [Validators.required]),
      wedstijdBaanImage: new FormControl(null,[Validators.required]),
      wedstrijdLink: new FormControl(null, [Validators.required]),
      baanLogo: new FormControl(null, [Validators.required]),
      datumYears: new FormControl(null, [Validators.required]),
      datumMonths: new FormControl(null, [Validators.required]),
      datumDays: new FormControl(null, [Validators.required]),
      played: new FormControl(),
    });
  }

  AddScheduleAction(postData: { courseName: string,
                                  wedstrijdName: string,
                                  aantalDagen: number,
                                  wedstijdBaanImage: string,
                                  wedstrijdLink: string,
                                  baanLogo: string,
                                  datumDays: number,
                                  datumMonths: number,
                                  datumYears: number,
                                  played: boolean }){
    let newUpcomingGame = new UpcomingGameModel(
      0,
      postData.courseName,
      postData.wedstrijdName,
      postData.aantalDagen,
      postData.wedstijdBaanImage,
      postData.wedstrijdLink,
      postData.baanLogo,
      postData.datumYears + "-" + postData.datumMonths + "-" + (postData.datumDays + 1), //Days =1 ivm bug
      postData.played,
      );


    this.scheduleService.AddScheduleItem(newUpcomingGame);

    this.scheduleDialogService.HideAddScheduleDialog();
  }

}
