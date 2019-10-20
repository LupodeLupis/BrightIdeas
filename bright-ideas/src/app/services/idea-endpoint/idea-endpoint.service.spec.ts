import { TestBed, async } from "@angular/core/testing";

import { IdeaEndpointService } from "./idea-endpoint.service";
import { HttpClientModule } from '@angular/common/http';


describe("IdeaEndpointService", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    })
  }));

  it("should be created", () => {
    const service: IdeaEndpointService = TestBed.get(IdeaEndpointService);
    expect(service).toBeTruthy();
  });
});
