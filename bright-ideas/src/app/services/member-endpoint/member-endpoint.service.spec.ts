import { TestBed } from '@angular/core/testing';
import { MemberEndpointService } from './member-endpoint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('MemberEndpointService', () => {
  let httpTestingController: HttpTestingController;
  let memberService: MemberEndpointService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MemberEndpointService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    memberService = TestBed.get(MemberEndpointService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const service: MemberEndpointService = TestBed.get(MemberEndpointService);
    expect(service).toBeTruthy();
  });

  it('should test for get all member', () => {
    const testData = [{
      memberId: '1',
      member: 'member1',
    },
    {
      memberId: '2',
      member: 'member2'
    }]
    memberService.getAllMember().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/members');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  })

  it('should test for get member by id', () => {
    const testData = {
      memberId: '1',
      member: 'testMember'
    };
    memberService.getMemberById('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  })

  it('should test for get member by userId', () => {
    const testData = {
      userId: '1',
      member: 'testMember'
    };
    memberService.getMemberByUserId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/userId=1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  })

  it('should test for get member by roleId', () => {
    const testData = {
      roleId: '1',
      member: 'testMember'
    };
    memberService.getMemberByRoleId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/roleId=1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  })

  it('should test for get member by ideaId', () => {
    const testData = {
      ideaId: '1',
      member: 'testMember'
    };
    memberService.getMemberByIdeaId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/ideaId=1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  })

  it('should test for get member by level', () => {
    const testData = {
      memberLevel: '1',
      member: 'testMember'
    };
    memberService.getMemberByLevel('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/memberLevel=1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  })

  it('should test for 404 error for get all members list', () => {
    const errorMessage = 'Error 404 error';

    memberService.getAllMember().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/members');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Member by id', () => {
    const errorMessage = 'Error 404 error';

    memberService.getMemberById('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Member by userId', () => {
    const errorMessage = 'Error 404 error';

    memberService.getMemberByUserId('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/userId=0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Member by roleId', () => {
    const errorMessage = 'Error 404 error';

    memberService.getMemberByRoleId('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/roleId=0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Member by ideaId', () => {
    const errorMessage = 'Error 404 error';

    memberService.getMemberByIdeaId('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/ideaId=0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Member by id', () => {
    const errorMessage = 'Error 404 error';

    memberService.getMemberById('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get Member by Level', () => {
    const errorMessage = 'Error 404 error';

    memberService.getMemberByLevel('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/member/memberLevel=0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
