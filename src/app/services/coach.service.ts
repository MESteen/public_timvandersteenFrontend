import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpService} from "../shared/http.service";
import {CoachModel} from "../models/coach.model";

@Injectable({providedIn: 'root'})
export class CoachService {

  private allCoaches: BehaviorSubject<CoachModel[]> = new BehaviorSubject<CoachModel[]>([] as CoachModel[]);

  private coachUrl = '/coach';

  constructor(private http: HttpService){}

  getAllCoaches(): Observable<CoachModel[]>{
    return this.allCoaches.asObservable();
  }

  getCoachItems(): Observable<CoachModel[]> {
    this.http.get<CoachModel[]>(this.coachUrl + '/all').subscribe(data => {
      let coaches = data as never[];
      this.allCoaches.next(coaches);
    });
    return this.allCoaches.asObservable();
  }

}
