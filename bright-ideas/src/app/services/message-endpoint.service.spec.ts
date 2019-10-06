import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageEndpointService } from './message-endpoint.service';

describe('MessageEndpointService', () => {
  let httpTestingController: HttpTestingController;
  let messageEndpointService: MessageEndpointService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MessageEndpointService
      ]
  });
    httpTestingController = TestBed.get(HttpTestingController);
    messageEndpointService = TestBed.get(MessageEndpointService);
});

  it('should be created', () => {
    const service: MessageEndpointService = TestBed.get(MessageEndpointService);
    expect(service).toBeTruthy();
  });


  it('should test for get message by id', () => {
    const testData = {
      timeStamp: '2019-07-01T00:00:00.000Z',
      text: 'testText',
      chatMembers: 'testChatMembers'
    };
    messageEndpointService.getMessagebyId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/message/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get all messages', () => {
    const testData = [{
      timeStamp: '2019-08-01T00:00:00.000Z',
      text: 'testText1',
      chatMembers: 'testChatMembers1'
    },
    {
      timeStamp: '2019-10-01T00:00:00.000Z',
      text: 'testText',
      chatMembers: 'testChatMembers2'
    }];
    messageEndpointService.getAllMessages().subscribe(res => {
      //console.log(res)
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/messages');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });


  it('should test for 404 error for get all messages ', () => {
    const errorMessage = 'Error 404 error';

    messageEndpointService.getAllMessages().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/messages');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get message by id ', () => {
    const errorMessage = 'Error 404 error';

    messageEndpointService.getMessagebyId('1').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/message/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
