import { TestBed, async } from "@angular/core/testing";
import { IdeaEndpointService } from "./idea-endpoint.service";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment'


describe("IdeaEndpointService", () => {
  // let httpTestingController: HttpTestingController;
  let ideaEndpointService: IdeaEndpointService;
  
  const testData = [{
    ideaID: 1,
    ideaName: "Vidnopoly",
    ideaDescription: "The Idea is based on creating a monopoly video game",
    ideaCreator: 1,
    ideaLeader: 1,
    media: 1,
    posting: 1,
    update: 1,
    date: "2019-05-04",
    toDoList: 1,
    ideaMembers: 1
  },
  {
    ideaID: 2,
    ideaName: "EPlanner",
    ideaDescription: "The Idea is based on creating a monopoly video game",
    ideaCreator: 1,
    ideaLeader: 1,
    media: 1,
    posting: 1,
    update: 1,
    date: "2019-05-04",
    toDoList: 1,
    ideaMembers: 1
  }]
  beforeEach(async(() => {
   
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        IdeaEndpointService
      ]
    })
    //  httpTestingController = TestBed.get(httpTestingController);
    ideaEndpointService = TestBed.get(IdeaEndpointService);
  }));

  it("should be created", () => {
    const service: IdeaEndpointService = TestBed.get(IdeaEndpointService);
    expect(service).toBeTruthy();
  });

  it('should get all ideas', () => {
    ideaEndpointService.getIdeas().subscribe(res => {
      expect(res).toEqual(this.testData);
    });
    // const request = httpTestingController
    //   .expectOne(`${environment.api}/idea`);
    // expect(request.request.method).toEqual('GET');
    // request.flush(testData);
  });

  
  it('should get an idea by id', () => {
    ideaEndpointService.getIdeaById(1).subscribe(res => {
      expect(res).toEqual(this.testData[0]);
    });
    // const request = httpTestingController
    //   .expectOne(`${environment.api}/idea`);
    // expect(request.request.method).toEqual('GET');
    // request.flush(testData);
  });


  it("should create an idea", () => {
    ideaEndpointService.createIdea(testData[0]).subscribe((res) => {
      expect(res).toEqual(testData[0]);
    });
  });
  //   const request = httpTestingController
  //   .expectOne(`${environment.api}/idea/create`);
  //   expect(request.request.method).toEqual('POST');
  //   request.flush(testData);
  // });

  it("should create update an idea", () => {
    ideaEndpointService.updateIdea(testData[1]).subscribe((res) => {
      expect(res).toEqual(testData[1]);
    });
  });
  //   const request = httpTestingController
  //   .expectOne(`${environment.api}/idea/update`);
  //   expect(request.request.method).toEqual('POST');
  //   request.flush(testData);
  // })
});
