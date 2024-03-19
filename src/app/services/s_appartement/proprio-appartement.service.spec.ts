import { TestBed } from '@angular/core/testing';

import { ProprioAppartementService } from './proprio-appartement.service';

describe('ProprioAppartementService', () => {
  let service: ProprioAppartementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprioAppartementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
