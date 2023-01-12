import { Component, OnInit } from '@angular/core';
import {UpcomingGameModel} from "../../../../models/upcoming-game.model";
import {ScheduleService} from "../../../../services/schedule.service";
import {ScheduleDialogService} from "../../../../services/dialog/schedule-dialog.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {
  upcomingGamesList: UpcomingGameModel[] = [];

  constructor(private scheduleService: ScheduleService, public scheduleDialogService: ScheduleDialogService, private userService: UserService) {}

  ngOnInit(): void {
    if(this.upcomingGamesList.length < 1){
      this.scheduleService.getGameItems();
    }
    this.GetScheduleItems()
  }

  GetScheduleItems(): void {
    this.scheduleService.GetUpcomingGames()
      .subscribe(scheduleItems => this.upcomingGamesList = scheduleItems);
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
