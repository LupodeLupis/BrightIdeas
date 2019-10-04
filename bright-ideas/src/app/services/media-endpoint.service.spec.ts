import { TestBed } from '@angular/core/testing';

import { MediaEndpointService } from './media-endpoint.service';

describe('MediaEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaEndpointService = TestBed.get(MediaEndpointService);
    expect(service).toBeTruthy();
  });
});
