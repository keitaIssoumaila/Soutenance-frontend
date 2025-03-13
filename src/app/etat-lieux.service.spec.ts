import { TestBed } from '@angular/core/testing';

import { EtatLieuxService } from './etat-lieux.service';

describe('EtatLieuxService', () => {
  let service: EtatLieuxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatLieuxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
