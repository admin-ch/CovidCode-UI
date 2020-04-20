import {AutoLoginComponent} from './auto-login.component';
import {TestBed} from '@angular/core/testing';
import {OidcSecurityService} from 'angular-auth-oidc-client';

describe('AutoLoginComponent', () => {
	const securityService = {
		onModuleSetup: jest.fn(),
		moduleSetup: jest.fn(),
		authorize: jest.fn()
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AutoLoginComponent],
			providers: [{provide: OidcSecurityService, useValue: securityService}]
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(AutoLoginComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	afterAll(() => {
		TestBed.resetTestingModule();
	});
});
