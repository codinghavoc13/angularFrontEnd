import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolManagerMainComponent } from './school-manager-main.component';

describe('SchoolManagerMainComponent', () => {
  let component: SchoolManagerMainComponent;
  let fixture: ComponentFixture<SchoolManagerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolManagerMainComponent]
    });
    fixture = TestBed.createComponent(SchoolManagerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
