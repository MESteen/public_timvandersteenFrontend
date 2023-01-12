import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingGameItemComponent } from './upcoming-game-item.component';

describe('UpcomingGameItemComponent', () => {
  let component: UpcomingGameItemComponent;
  let fixture: ComponentFixture<UpcomingGameItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingGameItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingGameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
