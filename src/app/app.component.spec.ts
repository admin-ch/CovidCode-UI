import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ObliqueTestingModule} from '@oblique/oblique';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {of} from 'rxjs';
import {AppComponent} from './app.component';
import {OauthService} from './auth/oauth.service';

describe('AppComponent', () => {
	let app: AppComponent;
	const mock = {
		name$: of('name'),
		isAuthenticated$: of(true),
		logout: jest.fn(),
		initialize: jest.fn(),
		loadClaims: jest.fn()
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([{path: 'test', component: AppComponent}]), ObliqueTestingModule],
			declarations: [AppComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{provide: OidcSecurityService, useValue: {isAuthenticated$: of(false)}},
				{provide: OauthService, useValue: mock}
			]
		}).compileComponents();
		const fixture = TestBed.createComponent(AppComponent);
		app = fixture.componentInstance;
	}));

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});

	describe('name$', () => {
		it('should be defined', () => {
			expect(app.name$).toBeDefined();
		});

		it('should output a name', done => {
			app.name$.subscribe(tooltip => {
				expect(tooltip).toBe('name');
				done();
			});
		});
	});

	describe('isAuthenticated$', () => {
		it('should be defined', () => {
			expect(app.isAuthenticated$).toBeDefined();
		});

		it('should output a boolean', done => {
			app.isAuthenticated$.subscribe(isAuthenticated => {
				expect(isAuthenticated).toBe(true);
				done();
			});
		});
	});

	// describe('currentPage$', () => {
	// 	it('should be defined', () => {
	// 		expect(app.currentPage$).toBeDefined();
	// 	});
	//
	// 	it('should output a page', done => {
	// 		const router = TestBed.inject(Router);
	// 		app.currentPage$.subscribe(tooltip => {
	// 			expect(tooltip).toBe('/test');
	// 			done();
	// 		});
	// 		router.navigate(['test']);
	// 	});
	// });

	describe('ngAfterViewInit', () => {
		let oAuth: OauthService;
		beforeEach(() => {
			oAuth = TestBed.inject(OauthService);
			app.ngAfterViewInit();
		});
		it('should call initialize', () => {
			expect(oAuth.initialize).toHaveBeenCalled();
		});
		it('should call loadClaims', () => {
			expect(oAuth.loadClaims).toHaveBeenCalled();
		});
	});

	describe('logout', () => {
		it('should call logout', () => {
			app.logout();
			const oAuth = TestBed.inject(OauthService);
			expect(oAuth.logout).toHaveBeenCalled();
		});
	});
});
