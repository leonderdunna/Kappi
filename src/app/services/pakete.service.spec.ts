import { TestBed } from '@angular/core/testing';

import { PaketeService } from './pakete.service';

describe('PaketeService', () => {
  let service: PaketeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaketeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
