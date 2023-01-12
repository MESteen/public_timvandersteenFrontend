import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoringPageComponent } from './sponsoring-page.component';

describe('SponsoringPageComponent', () => {
  let component: SponsoringPageComponent;
  let fixture: ComponentFixture<SponsoringPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsoringPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsoringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
