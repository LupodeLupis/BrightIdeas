import { TestBed, async } from "@angular/core/testing";

import { TodoEndpointService } from "./todo-endpoint.service";
import { HttpClientModule } from '@angular/common/http';
import { TestObject } from 'protractor/built/driverProviders';

describe("TodoEndpointService", () => {
  let service: TodoEndpointService
  let testToDo = [{
    id: 1,
    description: "to do 1 test"
  }, {
    id: 2,
    description: "to do 2 test"
  }
  ]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    })
      .compileComponents();
    service = TestBed.get(TodoEndpointService);
  }));

  it("should be created", () => {
    expect(service).toBeTruthy();
  });


  it('should get all toDos', () => {
    service.getToDos().subscribe(res => {
      expect(res).toEqual(testToDo);
    });
  });


  it('should get a todo by id', () => {
    service.getToDoById(1).subscribe(res => {
      expect(res).toEqual(testToDo[0]);
    });
  });


  it("should create a todo", () => {
    service.createToDo(testToDo[0]).subscribe((res) => {
      expect(res).toEqual(testToDo[0]);
    });
  });

  it("should update a todo", () => {
    service.updateToDo(testToDo[1]).subscribe((res) => {
      expect(res).toEqual(testToDo[1]);
    });
  });
});
