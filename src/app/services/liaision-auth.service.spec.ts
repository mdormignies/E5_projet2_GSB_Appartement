import { TestBed } from '@angular/core/testing';

import { LiaisionAuthService } from './liaision-auth.service';

describe('LiaisionAuthService', () => {
  let service: LiaisionAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiaisionAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
