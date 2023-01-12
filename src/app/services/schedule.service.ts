import { Injectable } from '@angular/core';
import {UpcomingGameModel} from "../models/upcoming-game.model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "../shared/http.service";
import {SnackbarService} from "../shared/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private allGames: BehaviorSubject<UpcomingGameModel[]> = new BehaviorSubject<UpcomingGameModel[]>([] as UpcomingGameModel[]);

  private gameUrl = '/game';
  private addGameUrl = '/game/add';
  private deleteGameUrl = '/game/delete/{wedstrijdId}';
  private editGameUrl = '/game/edit/{wedstrijdId}';

  constructor(private http: HttpService, private snackbarService: SnackbarService){}

  GetUpcomingGames(): Observable<UpcomingGameModel[]>{
    return this.allGames.asObservable();
  }

  getGameItems(): Observable<UpcomingGameModel[]> {
    this.http.get<UpcomingGameModel[]>(this.gameUrl + '/all').subscribe(data => {
      let games = data as never[];
      this.allGames.next(games);
    });
    return this.allGames.asObservable();
  }

  //POST
  AddScheduleItem(game: UpcomingGameModel) {
    let jsonObj = this.createDtoObject(game);
    return this.http.postJSON(this.addGameUrl, JSON.stringify(jsonObj)).subscribe(data => {
      this.getGameItems();
      this.snackbarService.show("Wedstrijd toegevoegd", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  //PUT
  EditScheduleItem(game: UpcomingGameModel) {
    let jsonObj = this.createDtoObject(game);
    return this.http.putJSON(this.editGameUrl.replace('{wedstrijdId}', game.wedstrijdId.toString()), JSON.stringify(jsonObj)).subscribe(data => {
      this.getGameItems();
      this.snackbarService.show("Wedstrijd aangepast", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  //DELETE
  DeleteUpcomingGame(wedstrijdId: number) {
    return this.http.delete(this.deleteGameUrl.replace('{wedstrijdId}', wedstrijdId.toString())).subscribe( data => {
      this.getGameItems();
      this.snackbarService.show("Wedstrijd verwijderd", "success");
    }, error => {
      this.snackbarService.show("Er ging iets fout", "danger");
    });
  }

  private createDtoObject(game: UpcomingGameModel) {
    let jsonObj = {
      "courseNaam": game.courseNaam,
      "wedstrijdNaam": game.wedstrijdNaam,
      "aantalDagen": game.aantalDagen,
      "wedstrijdBaanImage": game.wedstrijdBaanImage,
      "wedstrijdLink": game.wedstrijdLink,
      "baanLogo": game.baanLogo,
      "datum": new Date(game.datum) ?? "Dec 12, 2012, 12:00:00 AM",
      "gespeeld": game.gespeeld ?? false
    }

    return jsonObj;
  }
}
