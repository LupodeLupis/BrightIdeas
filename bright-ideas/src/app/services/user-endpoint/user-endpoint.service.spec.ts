import { TestBed } from "@angular/core/testing";

import { UserEndpointService } from '../../services/user-endpoint/user-endpoint.service';

describe("UserEndpointService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UserEndpointService = TestBed.get(UserEndpointService);
    expect(service).toBeTruthy();
  });
});
