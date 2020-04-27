import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {ApiService} from 'shared/api.service';
import {GenerateCodeService} from './generate-code.service';

describe('GenerateCodeService', () => {
	let service: GenerateCodeService;
	let api: ApiService;

	beforeEach(() => {
		const mock = {post: jest.fn()};
		mock.post.mockImplementation(() => of({authorizationCode: '123456123456'}));
		TestBed.configureTestingModule({
			providers: [{provide: ApiService, useValue: mock}]
		});
		service = TestBed.inject(GenerateCodeService);
		api = TestBed.inject(ApiService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('sendData', () => {
		it('should call POST on api service', () => {
			service.sendData(undefined);
			expect(api.post).toHaveBeenCalled();
		});

		it('should group characters by 3', done => {
			service.sendData(undefined).subscribe(code => {
				expect(code).toBe('123 456 123 456');
				done();
			});
		});
	});
});
