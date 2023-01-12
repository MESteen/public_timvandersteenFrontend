import { Component, OnInit } from '@angular/core';
import {CoachModel} from "../../../../models/coach.model";
import {CoachService} from "../../../../services/coach.service";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit {
  coachList: CoachModel[] = [];

  constructor(private coachService: CoachService) {
  }

  ngOnInit(): void {
    if(this.coachList.length < 1){
      this.coachService.getCoachItems();
    }
    this.GetCoaches()
  }

  GetCoaches(): void {
    this.coachService.getAllCoaches()
      .subscribe(coaches => this.coachList = coaches);
  }

}
