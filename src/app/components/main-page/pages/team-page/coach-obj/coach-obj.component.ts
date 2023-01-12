import {Component, Input, OnInit} from '@angular/core';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import {CoachModel} from "../../../../../models/coach.model";

@Component({
  selector: 'app-coach-obj',
  templateUrl: './coach-obj.component.html',
  styleUrls: ['./coach-obj.component.scss']
})
export class CoachObjComponent implements OnInit {
  @Input() coach!: CoachModel;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;

  constructor() { }

  ngOnInit(): void {
  }

}
