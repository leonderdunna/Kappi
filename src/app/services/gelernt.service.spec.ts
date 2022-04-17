import { TestBed } from '@angular/core/testing';

import { GelerntService } from './gelernt.service';

describe('GelerntService', () => {
  let service: GelerntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GelerntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
