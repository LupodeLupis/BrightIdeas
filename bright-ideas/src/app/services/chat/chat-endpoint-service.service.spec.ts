import { TestBed } from '@angular/core/testing';

import { ChatEndpointService } from './chat-endpoint-service.service';

describe('ChatEndpointServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatEndpointService = TestBed.get(ChatEndpointService);
    expect(service).toBeTruthy();
  });
});
