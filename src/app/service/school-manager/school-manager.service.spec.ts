import { TestBed } from '@angular/core/testing';

import { SchoolManagerService } from './school-manager.service';

describe('SchoolManagerServiceService', () => {
  let service: SchoolManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
