import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaesarCipherResultComponent } from './caesar-cipher-result.component';

describe('CaesarCipherResultComponent', () => {
  let component: CaesarCipherResultComponent;
  let fixture: ComponentFixture<CaesarCipherResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaesarCipherResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaesarCipherResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
