import { TestBed } from '@angular/core/testing';

import { IdeaEndpointService } from '../idea-endpoint.service';

describe('IdeaEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdeaEndpointService = TestBed.get(IdeaEndpointService);
    expect(service).toBeTruthy();
  });
});
