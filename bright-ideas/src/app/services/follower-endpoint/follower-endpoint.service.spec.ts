import { TestBed } from '@angular/core/testing';
import { FollowerEndpointService } from './follower-endpoint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('FollowerService', () => {
  let httpTestingController: HttpTestingController;
  let followerService: FollowerEndpointService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FollowerEndpointService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    followerService = TestBed.get(FollowerEndpointService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: FollowerEndpointService = TestBed.get(FollowerEndpointService);
    expect(service).toBeTruthy();
  });

  it('should test for get follower by id', () => {
    const testData = {
      idea: '1',
      follower: 'testFollower'
    };
    followerService.getFollowerbyId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/follower/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });


  it('should test for get all Followers', () => {
    const testData = [{
      idea: '1',
      follower: 'testFollower1',
    },
    {
      idea: '2',
      follower: 'testFollower2',
    }];
    followerService.getAllFollowers().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/follower');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for create a follower', () => {
    const testData = {
      ideaID: 4,
      userID: 2
    };
    followerService.createFollower(testData).subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController
    .expectOne('https://bright-ideas-api.herokuapp.com/follower/create');
    expect(request.request.method).toEqual('POST');
    request.flush(testData);
  });

  it('should test for delete a follower', () => {
    const testData = {
      ideaID: 4,
      userID: 2
    };
    followerService.deleteFollower('10').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController
    .expectOne('https://bright-ideas-api.herokuapp.com/follower/delete/10');
    expect(request.request.method).toEqual('DELETE');
    request.flush(testData);
  });

  it('should test for 404 error for get all followers list', () => {
    const errorMessage = 'Error 404 error';

    followerService.getAllFollowers().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/follower');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Follower by id', () => {
    const errorMessage = 'Error 404 error';

    followerService.getFollowerbyId('1').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/follower/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
