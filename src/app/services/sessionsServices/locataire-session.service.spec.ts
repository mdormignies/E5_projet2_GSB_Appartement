import { TestBed } from '@angular/core/testing';

import { LocataireSessionService } from './locataire-session.service';

describe('LocataireSessionService', () => {
  let service: LocataireSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocataireSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
