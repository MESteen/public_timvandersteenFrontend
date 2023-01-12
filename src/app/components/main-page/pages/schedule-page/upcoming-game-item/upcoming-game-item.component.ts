import {Component, Input, OnInit} from '@angular/core';
import {UpcomingGameModel} from "../../../../../models/upcoming-game.model";
import {ScheduleService} from "../../../../../services/schedule.service";
import {ScheduleDialogService} from "../../../../../services/dialog/schedule-dialog.service";
import {UserService} from "../../../../../services/user.service";

@Component({
  selector: 'app-upcoming-game-item',
  templateUrl: './upcoming-game-item.component.html',
  styleUrls: ['./upcoming-game-item.component.scss']
})
export class UpcomingGameItemComponent implements OnInit {
  @Input() tournooi!: UpcomingGameModel;
  isoDate!: Date;

  adminUser: boolean = true;

  constructor(private scheduleService: ScheduleService, public scheduleDialogService: ScheduleDialogService, private userService: UserService){
  }

  ngOnInit(): void {
    if(this.tournooi?.datum){
      this.isoDate = new Date(this.tournooi?.datum);
    }
  }

  DeleteUpcomingGameItem(id: number){
    this.scheduleService.DeleteUpcomingGame(id);
  }

  isAdmin() {
    return this.userService.isCurrentUserAdmin();
  }
}
