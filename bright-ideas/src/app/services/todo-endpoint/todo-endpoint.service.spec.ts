import { TestBed, async } from "@angular/core/testing";

import { TodoEndpointService } from "./todo-endpoint.service";
import { HttpClientModule } from '@angular/common/http';

describe("TodoEndpointService", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  it("should be created", () => {
    const service: TodoEndpointService = TestBed.get(TodoEndpointService);
    expect(service).toBeTruthy();
  });
});
