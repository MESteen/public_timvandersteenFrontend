import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachObjComponent } from './coach-obj.component';

describe('CoachObjComponent', () => {
  let component: CoachObjComponent;
  let fixture: ComponentFixture<CoachObjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachObjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachObjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
