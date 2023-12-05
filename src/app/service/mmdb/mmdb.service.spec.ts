import { TestBed } from '@angular/core/testing';

import { MmdbServiceService } from './mmdb.service';

describe('MmdbServiceService', () => {
  let service: MmdbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmdbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
