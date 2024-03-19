import { TestBed } from '@angular/core/testing';

import { LocataireLiaisonAuthService } from './locataire-liaison-auth.service';

describe('LocataireLiaisonAuthService', () => {
  let service: LocataireLiaisonAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocataireLiaisonAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
