import { TestBed } from '@angular/core/testing';

import { ApplyPositionModalService } from './apply-position-modal.service';

describe('ApplyPositionModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplyPositionModalService = TestBed.get(ApplyPositionModalService);
    expect(service).toBeTruthy();
  });
});
