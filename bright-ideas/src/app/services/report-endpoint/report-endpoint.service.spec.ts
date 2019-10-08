import { TestBed } from '@angular/core/testing';
import { ReportEndpointService } from './report-endpoint.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('ReportEndpointService', () => {
  let httpTestingController: HttpTestingController;
  let reportService: ReportEndpointService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ReportEndpointService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    reportService = TestBed.get(ReportEndpointService);
  });

  it('should be created', () => {
    const service: ReportEndpointService = TestBed.get(ReportEndpointService);
    expect(service).toBeTruthy();
  });

  it('should test for get all reports', () => {
    const testData = [{
      reportId: '1',
      report: 'testReport1',
    },
    {
      reportId: '2',
      report: 'testReport2',
    }];
    reportService.getAllReport().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/reports');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get report by id', () => {
    const testData = {
      reportId: '1',
      report: 'testReport'
    };
    reportService.getReportById('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/report/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get report by flagged idea', () => {
    const testData = {
      flaggedIdea: '1',
      report: 'testReport'
    };
    reportService.getReportByFlaggedIdea('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/report/ideaId=1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get report by flagged user', () => {
    const testData = {
      flaggedUser: '1',
      report: 'testReport'
    };
    reportService.getReportByFlaggedUser('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/report/userId=1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for 404 error for get all reports list', () => {
    const errorMessage = 'Error 404 error';

    reportService.getAllReport().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/reports');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get reports by id list', () => {
    const errorMessage = 'Error 404 error';

    reportService.getReportById('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/report/0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get reports by flagged idea list', () => {
    const errorMessage = 'Error 404 error';

    reportService.getReportByFlaggedIdea('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/report/ideaId=0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get reports by flagged idea list', () => {
    const errorMessage = 'Error 404 error';

    reportService.getReportByFlaggedUser('0').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/report/userId=0');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

});
