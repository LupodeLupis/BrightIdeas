import { TestBed, async } from "@angular/core/testing";

import { UserEndpointService } from '../../services/user-endpoint/user-endpoint.service';
import { HttpClientModule } from '@angular/common/http';

describe("UserEndpointService", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  it("should be created", () => {
    const service: UserEndpointService = TestBed.get(UserEndpointService);
    expect(service).toBeTruthy();
  });
});
