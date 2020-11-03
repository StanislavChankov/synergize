import { TestBed } from '@angular/core/testing';

import { BoxesCreatorService } from './boxes-creator.service';

describe('BoxesCreatorService', () => {
  let service: BoxesCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxesCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
