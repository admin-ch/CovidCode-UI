import {TestBed} from '@angular/core/testing';

import {GenerateCodeService} from './generate-code.service';
import {GenerateCodeModel} from './generate-code.model';

describe('GenerateCodeService', () => {
	let service: GenerateCodeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(GenerateCodeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('sendData', () => {
		it('should return a number', done => {
			service.sendData({} as GenerateCodeModel).subscribe(nbr => {
				expect(nbr).toBeDefined();
				done();
			});
		});
	});
});
