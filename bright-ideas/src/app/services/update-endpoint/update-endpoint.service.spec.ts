import { TestBed } from '@angular/core/testing';

import { UpdateEndpointService } from '../update-endpoint/update-endpoint.service';

describe('UpdateEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateEndpointService = TestBed.get(UpdateEndpointService);
    expect(service).toBeTruthy();
  });
});
