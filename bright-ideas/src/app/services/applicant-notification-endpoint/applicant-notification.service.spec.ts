import { TestBed } from '@angular/core/testing';

import { ApplicantNotificationService } from './applicant-notification.service';

describe('ApplicantNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicantNotificationService = TestBed.get(ApplicantNotificationService);
    expect(service).toBeTruthy();
  });
});
