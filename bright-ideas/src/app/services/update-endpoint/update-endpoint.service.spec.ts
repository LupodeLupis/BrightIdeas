import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UpdateEndpointService } from '../update-endpoint/update-endpoint.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('UpdateEndpointService', () => {
  let httpTestingController: HttpTestingController;
  let updateEndpointService: UpdateEndpointService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [

      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    updateEndpointService = TestBed.get(UpdateEndpointService);
  });

  it('should be created', () => {
    const service: UpdateEndpointService = TestBed.get(UpdateEndpointService);
    expect(service).toBeTruthy();
  });

  it('should test for get an update by id', () => {
    const testData = {
      date: '25-09-2019',
      description: 'testDescription'
    };
    updateEndpointService.getUpdateById('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/update/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get all Updates', () => {
    const testData = [{
      date: '2-08-2019',
      description: 'testDescription'
    },
    {
      date: '25-09-2019',
      description: 'testDescription'
    }];
    updateEndpointService.getAllUpdates().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/updates');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for 404 error for get all folloers list', () => {
    const errorMessage = 'Error 404 error';

    updateEndpointService.getAllUpdates().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/updates');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Follower by id', () => {
    const errorMessage = 'Error 404 error';

    updateEndpointService.getUpdateById('1').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/update/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });


});
