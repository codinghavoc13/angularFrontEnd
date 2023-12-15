import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentPageComponent } from './parent-page.component';

describe('ParentPageComponent', () => {
  let component: ParentPageComponent;
  let fixture: ComponentFixture<ParentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentPageComponent]
    });
    fixture = TestBed.createComponent(ParentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
