import { TestBed } from '@angular/core/testing';
import { MediaEndpointService } from '../../services/media-endpoint/media-endpoint.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { Media } from '../../models/media';

describe('MediaEndpointService', () => {
  let httpTestingController: HttpTestingController;
  let mediaEndpointService: MediaEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
    ],
    providers: [
      MediaEndpointService
    ]
  });
    httpTestingController = TestBed.get(HttpTestingController);
    mediaEndpointService = TestBed.get(MediaEndpointService);
  });

  it('should be created', () => {
    const service: MediaEndpointService = TestBed.get(MediaEndpointService);
    expect(service).toBeTruthy();
  });

  it('should test for get media by id', () => {
    const testData: Media = {
      id: 1,
      fileName: 'testfileName',
      mediaFormat: 'testmediaFormat',
      mediaURI: 'mediaURI'
    };
    mediaEndpointService.getMediabyId('1').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/media/1');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for get all Media', () => {
    const testData: Media[] = [
    {
      id: 1,
      fileName: 'testFilename1',
      mediaFormat: 'testMediaFormat1',
      mediaURI: 'mediaURI1'
    },
    {
      id: 2,
      fileName: 'testFilename2',
      mediaFormat: 'testMediaFormat2',
      mediaURI: 'mediaURI2'
    }];
    mediaEndpointService.getAllMedia().subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/media');
    expect(request.request.method).toEqual('GET');
    request.flush(testData);
  });

  it('should test for create a media', () => {
    const testData = {
      fileName: 'Vide',
      mediaFormat: 'pptx',
      mediaURI: 'https://lavideo.com/path/virtual-project-2017-slide'
    };
    mediaEndpointService.createMedia(testData).subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController
    .expectOne('https://bright-ideas-api.herokuapp.com/media/create');
    expect(request.request.method).toEqual('POST');
    request.flush(testData);
  });

  it('should test for delete a media', () => {
    const testData = {
      fileName: 'Vide',
      mediaFormat: 'pptx',
      mediaURI: 'https://lavideo.com/path/virtual-project-2017-slide'
    };
    mediaEndpointService.deleteMedia('105').subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController
    .expectOne('https://bright-ideas-api.herokuapp.com/media/delete/105');
    expect(request.request.method).toEqual('DELETE');
    request.flush(testData);
  });

  it('should test for update a media', () => {
    const testData = {
      mediaID: 90,
      fileName: 'Vide',
      mediaFormat: 'pptx',
      mediaURI: 'https://lavideo.com/path/virtual-project-2017-slide'
    };
    mediaEndpointService.updateMedia(testData).subscribe(res => {
      expect(res).toEqual(testData);
    });
    const request = httpTestingController
    .expectOne('https://bright-ideas-api.herokuapp.com/media/update');
    expect(request.request.method).toEqual('PUT');
    request.flush(testData);
  });

  it('should test for 404 error for get Media by Id', () => {
    const errorMessage = 'Error 404 error';

    mediaEndpointService.getMediabyId('1').subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/media/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should test for 404 error for get all Media', () => {
    const errorMessage = 'Error 404 error';

    mediaEndpointService.getAllMedia().subscribe(data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMessage, 'message');
      });
    const req = httpTestingController.expectOne('https://bright-ideas-api.herokuapp.com/media');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
