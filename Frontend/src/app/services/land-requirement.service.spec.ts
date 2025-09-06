import { TestBed } from '@angular/core/testing';

import { LandRequirementService } from './land-requirement.service';

describe('LandRequirementService', () => {
  let service: LandRequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandRequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
