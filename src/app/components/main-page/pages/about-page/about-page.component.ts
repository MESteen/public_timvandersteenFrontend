import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {
  tabSelected: Tabs = Tabs.INTERNATIONAL;
  tabsEnum: typeof Tabs = Tabs;
  constructor() { }

  ngOnInit(): void {
  }

  onClickTab(chooseTab: Tabs){
    this.tabSelected = chooseTab;
  }

}

export enum Tabs{
  INTERNATIONAL = 0,
  NATIONAL = 1,
}
