import { TestBed } from '@angular/core/testing';

import { TodoEndpointService } from './todo-endpoint.service';

describe('TodoEndpointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoEndpointService = TestBed.get(TodoEndpointService);
    expect(service).toBeTruthy();
  });
});
