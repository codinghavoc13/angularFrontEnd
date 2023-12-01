import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmdbMainComponent } from './mmdb-main.component';

describe('MmdbMainComponent', () => {
  let component: MmdbMainComponent;
  let fixture: ComponentFixture<MmdbMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MmdbMainComponent]
    });
    fixture = TestBed.createComponent(MmdbMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
