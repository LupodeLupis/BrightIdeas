import { TestBed } from '@angular/core/testing';

import { ModalNotificationService } from './modal-notification.service';

describe('ModalNotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalNotificationService = TestBed.get(ModalNotificationService);
    expect(service).toBeTruthy();
  });
});
