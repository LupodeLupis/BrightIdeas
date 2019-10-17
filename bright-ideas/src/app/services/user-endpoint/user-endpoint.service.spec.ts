import { TestBed } from "@angular/core/testing";

<<<<<<< HEAD
import { UserEndpointService } from "../user-endpoint.service";
=======
import { UserEndpointService } from '../../services/user-endpoint/user-endpoint.service';
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac

describe("UserEndpointService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UserEndpointService = TestBed.get(UserEndpointService);
    expect(service).toBeTruthy();
  });
});
