import { TestBed } from '@angular/core/testing';

import { TriangleMesh3dCreatorService } from './triangle-mesh-3d-creator.service';

describe('TriangleMesh3dCreatorService', () => {
  let service: TriangleMesh3dCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriangleMesh3dCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
