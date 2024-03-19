import { TestBed } from '@angular/core/testing';

import { ProprietaireLiaisonAuthService } from './proprietaire-liaison-auth.service';

describe('ProprietaireLiaisonAuthService', () => {
  let service: ProprietaireLiaisonAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietaireLiaisonAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
