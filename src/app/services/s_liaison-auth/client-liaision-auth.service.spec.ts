import { TestBed } from '@angular/core/testing';

import { ClientLiaisonAuthService } from './client-liaision-auth.service';

describe('LiaisionAuthService', () => {
  let service: ClientLiaisonAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLiaisonAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
