import { TestBed } from '@angular/core/testing';

import { AddUpdateServiceService } from './add-update-service.service';

describe('AddUpdateServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddUpdateServiceService = TestBed.get(AddUpdateServiceService);
    expect(service).toBeTruthy();
  });
});
