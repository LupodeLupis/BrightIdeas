import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageEndpointService } from './message-endpoint.service';

<<<<<<< HEAD
describe('MessageEndpointService', () => {
=======
fdescribe('MessageEndpointService', () => {
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
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
<<<<<<< HEAD
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/messages');
=======
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/message');
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

<<<<<<< HEAD

  it('should test for 404 error for get all messages ', () => {
    const errorMessage = 'Error 404 error';

=======
  it('should test for create a message', () => {
    const testData = {
      timeStamp: '2019-08-01T00:00:00.000Z',
      text: 'testText1',
      chatMembers: 'testChatMembers1'
    };
    messageEndpointService.createMessage(testData).subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/message/create');
    expect(request.request.method).toEqual('POST');
    request.flush(testData);
  });


  it('should test for 404 error for get all messages ', () => {
    const errorMessage = 'Error 404 error';
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
    messageEndpointService.getAllMessages().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
<<<<<<< HEAD
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/messages');
=======
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/message');
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get message by id ', () => {
    const errorMessage = 'Error 404 error';
<<<<<<< HEAD

=======
>>>>>>> 327f051ee2ca4c845ad052b143c65a7d0aa7b9ac
    messageEndpointService.getMessagebyId('1').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/message/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
