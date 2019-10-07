import { TestBed } from '@angular/core/testing';

import { ProfileEndpointService } from './profile-endpoint.service';

describe('ProfileEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfileEndpointService = TestBed.get(ProfileEndpointService);
    expect(service).toBeTruthy();
  });
});
