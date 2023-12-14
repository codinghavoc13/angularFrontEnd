import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssignmentsComponent } from './add-assignments.component';

describe('AddAssignmentsComponent', () => {
  let component: AddAssignmentsComponent;
  let fixture: ComponentFixture<AddAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssignmentsComponent]
    });
    fixture = TestBed.createComponent(AddAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
