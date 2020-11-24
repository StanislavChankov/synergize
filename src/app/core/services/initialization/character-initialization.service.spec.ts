import { TestBed } from '@angular/core/testing';

import { CharacterInitializationService } from './character-initialization.service';

describe('CharacterInitializationService', () => {
  let service: CharacterInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterInitializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
