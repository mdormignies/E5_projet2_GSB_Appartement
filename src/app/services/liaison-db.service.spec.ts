import { TestBed } from '@angular/core/testing';

import { LiaisonDBService } from './liaison-db.service';

describe('LiaisonDBService', () => {
  let service: LiaisonDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiaisonDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
