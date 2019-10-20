import { TestBed, async } from "@angular/core/testing";

import { ProfileEndpointService } from "./profile-endpoint.service";
import { HttpClientModule } from '@angular/common/http';

describe("ProfileEndpointService", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  it("should be created", () => {
    const service: ProfileEndpointService = TestBed.get(ProfileEndpointService);
    expect(service).toBeTruthy();
  });
});
