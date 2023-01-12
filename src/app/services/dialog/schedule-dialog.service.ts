import { Injectable } from '@angular/core';
import {UpcomingGameModel} from "../../models/upcoming-game.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleDialogService {
  showEditScheduleDialog = false;
  showAddScheduleDialog = false;
  scheduleToEdit!: UpcomingGameModel;

  constructor() { }

  ShowEditScheduleDialog(upcomingGame: UpcomingGameModel){
    this.scheduleToEdit = upcomingGame;
    this.showEditScheduleDialog = true;
  }

  HideEditScheduleDialog(){
    this.showEditScheduleDialog = false;
  }

  ShowAddScheduleDialog(){
    this.showAddScheduleDialog = true;
  }

  HideAddScheduleDialog(){
    this.showAddScheduleDialog = false;
  }
}
