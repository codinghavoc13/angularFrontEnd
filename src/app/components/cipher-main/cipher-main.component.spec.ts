import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherMainComponent } from './cipher-main.component';

describe('CipherMainComponent', () => {
  let component: CipherMainComponent;
  let fixture: ComponentFixture<CipherMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CipherMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CipherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
