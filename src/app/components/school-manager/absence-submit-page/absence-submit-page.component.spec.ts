import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceSubmitPageComponent } from './absence-submit-page.component';

describe('AbsenceSubmitPageComponent', () => {
  let component: AbsenceSubmitPageComponent;
  let fixture: ComponentFixture<AbsenceSubmitPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsenceSubmitPageComponent]
    });
    fixture = TestBed.createComponent(AbsenceSubmitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
