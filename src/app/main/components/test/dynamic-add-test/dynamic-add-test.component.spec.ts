import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAddTestComponent } from './dynamic-add-test.component';

describe('DynamicAddTestComponent', () => {
  let component: DynamicAddTestComponent;
  let fixture: ComponentFixture<DynamicAddTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicAddTestComponent]
    });
    fixture = TestBed.createComponent(DynamicAddTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
