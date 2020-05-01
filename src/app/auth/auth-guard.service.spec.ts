import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ObliqueTestingModule} from '@oblique/oblique';
import {AuthGuardService} from './auth-guard.service';
import {OauthService} from './oauth.service';
import {AutoLoginComponent} from './auto-login.component';
import {Router} from '@angular/router';
import {ReplaySubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

describe('AuthGuardService', () => {
	let service: AuthGuardService;
	let auth: OauthService;
	let router: Router;
	const mock = {
		claims$: new ReplaySubject(1),
		hasUserRole: jest.fn()
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes([{path: 'auth/auto-login', component: AutoLoginComponent}]),
				ObliqueTestingModule
			],
			declarations: [AutoLoginComponent],
			providers: [
				{provide: OauthService, useValue: mock},
				{provide: TranslateService, useValue: {currentLang: 'en'}}
			]
		}).compileComponents();
		service = TestBed.inject(AuthGuardService);
		auth = TestBed.inject(OauthService);
		router = TestBed.inject(Router);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('canActivate', () => {
		describe('without claims', () => {
			beforeEach(() => {
				mock.claims$.next(undefined);
			});

			it('should return false', done => {
				service.canActivate(null, null).subscribe(a => {
					expect(a).toBe(false);
					done();
				});
			});

			it('should navigate to auto-login', done => {
				jest.spyOn(router, 'navigate');
				service.canActivate(null, null).subscribe(a => {
					expect(router.navigate).toHaveBeenCalledWith(['auth/auto-login']);
					done();
				});
			});
		});

		describe('Unauthorized', () => {
			beforeEach(() => {
				window = Object.create(window);
				Object.defineProperty(window, 'location', {
					value: {
						href: ''
					}
				});
				mock.claims$.next({});
				jest.spyOn(auth, 'hasUserRole').mockReturnValue(false);
			});

			it('should return false', done => {
				service.canActivate(null, null).subscribe(a => {
					expect(a).toBe(false);
					done();
				});
			});

			it('should not navigate', done => {
				jest.spyOn(router, 'navigate');
				service.canActivate(null, null).subscribe(a => {
					expect(router.navigate).not.toHaveBeenCalled();
					done();
				});
			});

			it('should redirect to auto-login', done => {
				service.canActivate(null, null).subscribe(a => {
					expect(window.location.href).toEqual('https://www.eiam.admin.ch/?c=f!403pts!pub&l=en');
					done();
				});
			});
		});

		describe('Authorized', () => {
			beforeEach(() => {
				mock.claims$.next({});
				jest.spyOn(auth, 'hasUserRole').mockReturnValue(true);
			});

			it('should return false', done => {
				service.canActivate(null, null).subscribe(a => {
					expect(a).toBe(true);
					done();
				});
			});

			it('should not navigate', done => {
				jest.spyOn(router, 'navigate');
				service.canActivate(null, null).subscribe(a => {
					expect(router.navigate).not.toHaveBeenCalled();
					done();
				});
			});
		});
	});

	describe('canActivateChild', () => {
		describe('without claims', () => {
			beforeEach(() => {
				mock.claims$.next(undefined);
			});

			it('should return false', done => {
				service.canActivateChild(null, null).subscribe(a => {
					expect(a).toBe(false);
					done();
				});
			});

			it('should navigate to auto-login', done => {
				jest.spyOn(router, 'navigate');
				service.canActivateChild(null, null).subscribe(a => {
					expect(router.navigate).toHaveBeenCalledWith(['auth/auto-login']);
					done();
				});
			});
		});

		describe('Unauthorized', () => {
			beforeEach(() => {
				window = Object.create(window);
				Object.defineProperty(window, 'location', {
					value: {
						href: ''
					}
				});
				mock.claims$.next({});
				jest.spyOn(auth, 'hasUserRole').mockReturnValue(false);
			});

			it('should return false', done => {
				service.canActivateChild(null, null).subscribe(a => {
					expect(a).toBe(false);
					done();
				});
			});

			it('should not navigate', done => {
				jest.spyOn(router, 'navigate');
				service.canActivateChild(null, null).subscribe(a => {
					expect(router.navigate).not.toHaveBeenCalled();
					done();
				});
			});

			it('should redirect to auto-login', done => {
				service.canActivateChild(null, null).subscribe(a => {
					expect(window.location.href).toEqual('https://www.eiam.admin.ch/?c=f!403pts!pub&l=en');
					done();
				});
			});
		});

		describe('Authorized', () => {
			beforeEach(() => {
				mock.claims$.next({});
				jest.spyOn(auth, 'hasUserRole').mockReturnValue(true);
			});

			it('should return false', done => {
				service.canActivateChild(null, null).subscribe(a => {
					expect(a).toBe(true);
					done();
				});
			});

			it('should not navigate', done => {
				jest.spyOn(router, 'navigate');
				service.canActivateChild(null, null).subscribe(a => {
					expect(router.navigate).not.toHaveBeenCalled();
					done();
				});
			});
		});
	});

	describe('canLoad', () => {
		describe('without claims', () => {
			beforeEach(() => {
				mock.claims$.next(undefined);
			});

			it('should return false', done => {
				service.canLoad(null).subscribe(a => {
					expect(a).toBe(false);
					done();
				});
			});

			it('should navigate to auto-login', done => {
				jest.spyOn(router, 'navigate');
				service.canLoad(null).subscribe(a => {
					expect(router.navigate).toHaveBeenCalledWith(['auth/auto-login']);
					done();
				});
			});
		});

		describe('Unauthorized', () => {
			beforeEach(() => {
				window = Object.create(window);
				Object.defineProperty(window, 'location', {
					value: {
						href: ''
					}
				});
				mock.claims$.next({});
				jest.spyOn(auth, 'hasUserRole').mockReturnValue(false);
			});

			it('should return false', done => {
				service.canLoad(null).subscribe(a => {
					expect(a).toBe(false);
					done();
				});
			});

			it('should not navigate', done => {
				jest.spyOn(router, 'navigate');
				service.canLoad(null).subscribe(a => {
					expect(router.navigate).not.toHaveBeenCalled();
					done();
				});
			});

			it('should redirect to auto-login', done => {
				service.canLoad(null).subscribe(a => {
					expect(window.location.href).toEqual('https://www.eiam.admin.ch/?c=f!403pts!pub&l=en');
					done();
				});
			});
		});

		describe('Authorized', () => {
			beforeEach(() => {
				mock.claims$.next({});
				jest.spyOn(auth, 'hasUserRole').mockReturnValue(true);
			});

			it('should return false', done => {
				service.canLoad(null).subscribe(a => {
					expect(a).toBe(true);
					done();
				});
			});

			it('should not navigate', done => {
				jest.spyOn(router, 'navigate');
				service.canLoad(null).subscribe(a => {
					expect(router.navigate).not.toHaveBeenCalled();
					done();
				});
			});
		});
	});
});
