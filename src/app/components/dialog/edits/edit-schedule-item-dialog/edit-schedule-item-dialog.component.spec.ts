import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScheduleItemDialogComponent } from './edit-schedule-item-dialog.component';

describe('EditScheduleItemDialogComponent', () => {
  let component: EditScheduleItemDialogComponent;
  let fixture: ComponentFixture<EditScheduleItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditScheduleItemDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditScheduleItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
