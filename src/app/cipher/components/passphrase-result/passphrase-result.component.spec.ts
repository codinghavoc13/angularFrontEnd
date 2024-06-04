import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassphraseResultComponent } from './passphrase-result.component';

describe('PassphraseResultComponent', () => {
  let component: PassphraseResultComponent;
  let fixture: ComponentFixture<PassphraseResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassphraseResultComponent]
    });
    fixture = TestBed.createComponent(PassphraseResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
