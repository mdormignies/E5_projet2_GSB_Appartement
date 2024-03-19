import { TestBed } from '@angular/core/testing';

import { ProprietaireSessionService } from './proprietaire-session.service';

describe('ProprietaireSessionService', () => {
  let service: ProprietaireSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProprietaireSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
