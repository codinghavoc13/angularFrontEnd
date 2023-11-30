import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaesarexplainedComponent } from './caesarexplained.component';

describe('CaesarexplainedComponent', () => {
  let component: CaesarexplainedComponent;
  let fixture: ComponentFixture<CaesarexplainedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaesarexplainedComponent]
    });
    fixture = TestBed.createComponent(CaesarexplainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
