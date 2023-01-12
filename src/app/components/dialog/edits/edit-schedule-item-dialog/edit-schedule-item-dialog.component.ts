import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ScheduleService} from "../../../../services/schedule.service";
import {ScheduleDialogService} from "../../../../services/dialog/schedule-dialog.service";
import {UpcomingGameModel} from "../../../../models/upcoming-game.model";

@Component({
  selector: 'app-edit-schedule-item-dialog',
  templateUrl: './edit-schedule-item-dialog.component.html',
  styleUrls: ['./edit-schedule-item-dialog.component.scss']
})
export class EditScheduleItemDialogComponent implements OnInit {
  editScheduleForm!: FormGroup;
  isoDate = new Date(this.scheduleDialogService.scheduleToEdit.datum);

  constructor(private formBuilder: FormBuilder, public scheduleDialogService: ScheduleDialogService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }
  createFormGroup() {
    this.editScheduleForm = this.formBuilder.group({
      courseName: new FormControl(null,[Validators.required]),
      wedstrijdName: new FormControl(null, [Validators.required]),
      aantalDagen: new FormControl(null, [Validators.required]),
      wedstijdBaanImage: new FormControl(null,[Validators.required]),
      wedstrijdLink: new FormControl(null, [Validators.required]),
      baanLogo: new FormControl(null, [Validators.required]),
      datumYears: new FormControl(null, [Validators.required]),
      datumMonths: new FormControl(null, [Validators.required]),
      datumDays: new FormControl(null, [Validators.required]),
      played: new FormControl()
    });
  }

  editScheduleAction(postData: { courseName: string,
    wedstrijdName: string,
    aantalDagen: number,
    wedstijdBaanImage: string,
    wedstrijdLink: string,
    baanLogo: string,
    datumDays: number,
    datumMonths: number,
    datumYears: number,
    played: boolean }){

    let years = postData.datumYears ?? this.isoDate.getFullYear();
    let months = postData.datumMonths ?? (this.isoDate.getMonth() + 1);
    let days =postData.datumDays ?? this.isoDate.getDate();
    let datum = years + "-" + months + "-" + (days + 1);

    let editedUpcomingGame = new UpcomingGameModel(
      this.scheduleDialogService.scheduleToEdit.wedstrijdId,
      postData.courseName ?? this.scheduleDialogService.scheduleToEdit.courseNaam,
      postData.wedstrijdName ?? this.scheduleDialogService.scheduleToEdit.wedstrijdNaam,
      postData.aantalDagen ?? this.scheduleDialogService.scheduleToEdit.aantalDagen,
      postData.wedstijdBaanImage ?? this.scheduleDialogService.scheduleToEdit.wedstrijdBaanImage,
      postData.wedstrijdLink ?? this.scheduleDialogService.scheduleToEdit.wedstrijdLink,
      postData.baanLogo ?? this.scheduleDialogService.scheduleToEdit.baanLogo,
      datum.toString(),
      postData.played ??  this.scheduleDialogService.scheduleToEdit.gespeeld,
    );

    this.scheduleService.EditScheduleItem(editedUpcomingGame);

    this.scheduleDialogService.HideEditScheduleDialog();
  }

}
