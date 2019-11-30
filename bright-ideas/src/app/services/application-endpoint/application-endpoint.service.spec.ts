import { TestBed } from '@angular/core/testing';

import { ApplicationEndpointService } from './application-endpoint.service';

describe('ApplicationEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationEndpointService = TestBed.get(ApplicationEndpointService);
    expect(service).toBeTruthy();
  });
});
