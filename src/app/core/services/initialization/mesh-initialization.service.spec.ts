import { TestBed } from '@angular/core/testing';

import { MeshInitializationService } from './mesh-initialization.service';

describe('MeshInitializationService', () => {
  let service: MeshInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeshInitializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
