import { TestBed, async } from "@angular/core/testing";

import { IdeaEndpointService } from "./idea-endpoint.service";
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment'


describe("IdeaEndpointService", () => {
  let httpTestingController: HttpTestingController;
  let ideaEndpointService: IdeaEndpointService;

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

  // it("should get all ideas", () => {
  //   const testData = {

  //   }
  // })
});
