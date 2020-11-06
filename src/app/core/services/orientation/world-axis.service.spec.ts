import { TestBed } from '@angular/core/testing';

import { WorldAxisService } from './world-axis.service';

describe('WorldAxisService', () => {
	let service: WorldAxisService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(WorldAxisService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
