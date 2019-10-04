import { TestBed } from '@angular/core/testing';
import { FollowerService } from './follower-endpoint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('FollowerService', () => {
  let httpTestingController: HttpTestingController;
  let followerService: FollowerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        FollowerService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    followerService = TestBed.get(FollowerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: FollowerService = TestBed.get(FollowerService);
    expect(service).toBeTruthy();
  });

  it('should test for get follower by id', () => {
    const testData = [{
      followerID: '1',
      ideaID: 'testIdeaId',
      userID: 'testuserID'
    }];
    followerService.getFollowbyId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/follower/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  fit('should test for 404 error for get policy list', () => {
    const errorMessage = 'Error 404 error';

    followerService.getFollowbyId('1').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/follower/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });



  


});
