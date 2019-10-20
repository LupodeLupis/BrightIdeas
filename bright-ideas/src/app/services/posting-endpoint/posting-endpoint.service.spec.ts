import { TestBed } from '@angular/core/testing';
import { PostingEndpointService } from './posting-endpoint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('PostingEndpointService', () => {
  let httpTestingController: HttpTestingController;
  let postingService: PostingEndpointService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PostingEndpointService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    postingService = TestBed.get(PostingEndpointService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: PostingEndpointService = TestBed.get(PostingEndpointService);
    expect(service).toBeTruthy();
  });

  it('should test for get all Postings', () => {
    const testData = [{
      postingId: '1',
      posting: 'testPosting1',
    },
    {
      postingId: '2',
      posting: 'testPosting2',
    }];
    postingService.getAllPosting().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/postings');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get posting by id', () => {
    const testData = {
      postingId: '1',
      posting: 'testPosting'
    };
    postingService.getAllPosting().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  // it('should test for get posting by name wildcard', () => {
  //   const testData = {
  //     postingName: 'test',
  //     posting: 'testPosting'
  //   };
  //   postingService.getPostingByNameWildcard('test').subscribe(res => {
  //     expect(res).toEqual(testData);
  //   });
  //   const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/postingName%test');
  //   expect(request.request.method).toEqual('GET');
  //   request.flush(testData);
  // });

  // it('should test for get posting by description wildcard', () => {
  //   const testData = {
  //     postingDescription: 'test',
  //     posting: 'testPosting'
  //   };
  //   postingService.getPostingByDescriptionWildcard('test').subscribe(res => {
  //     expect(res).toEqual(testData);
  //   });
  //   const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/postingDescription%test');
  //   expect(request.request.method).toEqual('GET');
  //   request.flush(testData);
  // });

  it('should test for get posting with open positions', () => {
    const testData = {
      numberFilled: '0',
      numberAvailable: '1',
      posting: 'testPosting'
    };
    postingService.getPostingWithOpenPositions().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/open');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for 404 error for get all postings list', () => {
    const errorMessage = 'Error 404 error';

    postingService.getAllPosting().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/postings');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get posting by id list', () => {
    const errorMessage = 'Error 404 error';

    postingService.getPostingById('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  // it('should test for 404 error for get posting by name wildcard list', () => {
  //   const errorMessage = 'Error 404 error';

  //   postingService.getPostingByNameWildcard('testFail').subscribe(data => fail('should have failed with the 404 error'),
  //     (error: HttpErrorResponse) => {
  //       expect(error.status).toEqual(404, 'status');
  //       expect(error.error).toEqual(errorMessage, 'message');
  //     });
  //   const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/postingName%testFail');
  //   req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  // });

  // it('should test for 404 error for get posting by description wildcard list', () => {
  //   const errorMessage = 'Error 404 error';

  //   postingService.getPostingByDescriptionWildcard('testFail').subscribe(data => fail('should have failed with the 404 error'),
  //     (error: HttpErrorResponse) => {
  //       expect(error.status).toEqual(404, 'status');
  //       expect(error.error).toEqual(errorMessage, 'message');
  //     });
  //   const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/postingDdescription%testFail');
  //   req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  // });

  it('should test for 404 error for get posting with open positions list', () => {
    const errorMessage = 'Error 404 error';

    postingService.getPostingWithOpenPositions().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/posting/open');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
