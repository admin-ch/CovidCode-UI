import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ObliqueTestingModule} from '@oblique/oblique';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {of} from 'rxjs';
import {first, skip} from 'rxjs/operators';
import {AppComponent} from './app.component';
import {OauthService} from './authglobal/oauth.service';

describe('AppComponent', () => {
	let app: AppComponent;
	const mock = {
		name$: of('name'),
		isAuthenticated$: of(true),
		logout: jest.fn(),
		initialize: jest.fn(),
		pamsLoginStatus: jest.fn()
	};
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([{path: 'test', component: AppComponent}]), ObliqueTestingModule],
			declarations: [AppComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{provide: OidcSecurityService, useValue: {}},
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

	describe('currentPage$', () => {
		it('should be defined', () => {
			expect(app.currentPage$).toBeDefined();
		});

		it('should output a page', done => {
			const router = TestBed.inject(Router);
			app.currentPage$.subscribe(tooltip => {
				expect(tooltip).toBe('/test');
				done();
			});
			router.navigate(['test']);
		});
	});

	describe('helpTooltip$', () => {
		it('should be defined', () => {
			expect(app.helpTooltip$).toBeDefined();
		});

		it('should output a tooltip with default value', done => {
			app.helpTooltip$.pipe(first()).subscribe(tooltip => {
				expect(tooltip).toBe('help.tooltip.out');
				done();
			});
		});

		it('should output a tooltip with an event', done => {
			app.helpTooltip$.pipe(skip(1)).subscribe(tooltip => {
				expect(tooltip).toBe('help.tooltip.in');
				done();
			});
		});
	});

	describe('ngAfterViewInit', () => {
		let oAuth: OauthService;
		beforeEach(() => {
			oAuth = TestBed.inject(OauthService);
			app.ngAfterViewInit();
		});
		it('should call initialize', () => {
			expect(oAuth.initialize).toHaveBeenCalled();
		});
		it('should call pamsLoginStatus', () => {
			expect(oAuth.pamsLoginStatus).toHaveBeenCalled();
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
