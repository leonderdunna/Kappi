import { TestBed } from '@angular/core/testing';

import { LernenService } from './lernen.service';

describe('LernenService', () => {
  let service: LernenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LernenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
