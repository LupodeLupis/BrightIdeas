import { TestBed } from '@angular/core/testing';

import { MessageEndpointService } from './message-endpoint.service';

describe('MessageEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageEndpointService = TestBed.get(MessageEndpointService);
    expect(service).toBeTruthy();
  });
});
