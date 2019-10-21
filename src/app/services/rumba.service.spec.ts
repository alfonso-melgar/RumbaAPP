import { TestBed } from '@angular/core/testing';

import { RumbaService } from './rumba.service';

describe('RumbaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RumbaService = TestBed.get(RumbaService);
    expect(service).toBeTruthy();
  });
});
