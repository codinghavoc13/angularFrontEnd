import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassphraseExplainedComponent } from './passphrase-explained.component';

describe('PassphraseExplainedComponent', () => {
  let component: PassphraseExplainedComponent;
  let fixture: ComponentFixture<PassphraseExplainedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassphraseExplainedComponent]
    });
    fixture = TestBed.createComponent(PassphraseExplainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
