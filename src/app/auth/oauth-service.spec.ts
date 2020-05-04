import {TestBed} from '@angular/core/testing';
import {EMPTY, of} from 'rxjs';
import {LoggerService, OidcSecurityService} from 'angular-auth-oidc-client';
import {OauthService} from './oauth.service';
import {OpenIdConfigService} from './open-id-config-service';

describe('OauthService', () => {
	let service: OauthService;
	let auth: OidcSecurityService;

	describe('setup$', () => {
		runTest(false, false, 0);
		runTest(true, false, 1);
		runTest(true, true, 1);
		runTest(false, true, 1);

		function runTest(async: boolean, sync: boolean, times: number): void {
			describe(`async: ${async}, sync: ${sync}`, () => {
				const mock = {fn: jest.fn()};
				beforeEach(() => {
					TestBed.configureTestingModule({
						providers: [
							{
								provide: OidcSecurityService,
								useValue: {
									onModuleSetup: of(async),
									moduleSetup: sync,
									authorize: jest.fn()
								}
							},
							{provide: LoggerService, useValue: {logDebug: () => {}}}
						]
					}).compileComponents();
					service = TestBed.inject(OauthService);
					service.setup$.subscribe(() => mock.fn());
					jest.spyOn(mock, 'fn');
				});

				it(`should call emit ${times} times`, () => {
					expect(mock.fn).toHaveBeenCalledTimes(times);
				});
			});
		}
	});

	describe('service', () => {
		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					{
						provide: OidcSecurityService,
						useValue: {
							logoff: jest.fn(),
							authorize: jest.fn(),
							authorizedCallbackWithCode: jest.fn(),
							moduleSetup: true,
							getIsAuthorized: jest.fn(),
							getUserData: jest.fn()
						}
					},
					{provide: OpenIdConfigService, useValue: {autoLogin: true}},
					{provide: LoggerService, useValue: {logDebug: () => {}}}
				]
			}).compileComponents();
			service = TestBed.inject(OauthService);
			auth = TestBed.inject(OidcSecurityService);
		});

		it('should be created', () => {
			expect(service).toBeTruthy();
		});

		describe('claims$', () => {
			it('should be defined', () => {
				expect(service.claims$).toBeDefined();
			});
		});

		describe('isAuthenticated$', () => {
			it('should be defined', () => {
				expect(service.isAuthenticated$).toBeDefined();
			});
		});

		describe('name$', () => {
			it('should be defined', () => {
				expect(service.name$).toBeDefined();
			});

			it('should emit name if present', done => {
				// @ts-ignore
				service.claims.next({name: 'test'});
				service.name$.subscribe(name => {
					expect(name).toBe('test');
					done();
				});
			});

			it('should emit displayName if present', done => {
				// @ts-ignore
				service.claims.next({name: 'test', displayName: 'test2'});
				service.name$.subscribe(name => {
					expect(name).toBe('test2');
					done();
				});
			});
		});

		describe('setup$', () => {
			it('should be defined', () => {
				expect(service.setup$).toBeDefined();
			});
		});

		describe('login', () => {
			it('should call authorize', () => {
				service.login();
				expect(auth.authorize).toHaveBeenCalled();
			});
		});

		describe('logout', () => {
			it('should call logoff', () => {
				service.logout();
				expect(auth.logoff).toHaveBeenCalled();
			});
		});

		describe('initialize', () => {
			it('should call authorizedCallbackWithCode', () => {
				service.initialize();
				expect(auth.authorizedCallbackWithCode).toHaveBeenCalled();
			});
		});

		describe('loadClaims', () => {
			it('should call getIsAuthorized', () => {
				jest.spyOn(auth, 'getIsAuthorized').mockReturnValue(EMPTY);
				service.loadClaims();
				expect(auth.getIsAuthorized).toHaveBeenCalled();
			});

			describe('unauthorized', () => {
				beforeEach(() => {
					jest.spyOn(auth, 'getIsAuthorized').mockReturnValue(of(false));
					jest.spyOn(auth, 'getUserData').mockReturnValue(of({}));
				});
				describe('with autoLogin', () => {
					it('should call authorize', () => {
						service.loadClaims();
						expect(auth.authorize).toHaveBeenCalled();
					});
					it('should not call getUserData', () => {
						service.loadClaims();
						expect(auth.getUserData).not.toHaveBeenCalled();
					});
				});
				describe('without autoLogin', () => {
					beforeEach(() => {
						const config = TestBed.inject(OpenIdConfigService);
						Object.defineProperty(config, 'autoLogin', {value: false});
					});
					it('should not call authorize', () => {
						service.loadClaims();
						expect(auth.authorize).not.toHaveBeenCalled();
					});
					it('should emit isAuthenticated true', done => {
						service.loadClaims();
						service.isAuthenticated$.subscribe(r => {
							expect(r).toBe(false);
							done();
						});
					});
					it('should call getUserData', () => {
						service.loadClaims();
						expect(auth.getUserData).toHaveBeenCalled();
					});

					it('should emit claims', done => {
						service.claims$.subscribe(claims => {
							expect(claims).toBe(undefined);
							done();
						});
						service.loadClaims();
					});
				});
			});

			describe('authorized', () => {
				beforeEach(() => {
					jest.spyOn(auth, 'getIsAuthorized').mockReturnValue(of(true));
				});
				it('should emit isAuthenticated true', done => {
					service.loadClaims();
					service.isAuthenticated$.subscribe(r => {
						expect(r).toBe(true);
						done();
					});
				});
				it('should call getUserData', () => {
					service.loadClaims();
					expect(auth.getUserData).toHaveBeenCalled();
				});

				it('should emit empty claims with no user data', done => {
					jest.spyOn(auth, 'getUserData').mockReturnValue(of(undefined));
					service.claims$.subscribe(claims => {
						expect(claims).toEqual({});
						done();
					});
					service.loadClaims();
				});

				it('should emit claims with user data', done => {
					const testClaims = {test: 'test'};
					jest.spyOn(auth, 'getUserData').mockReturnValue(of(testClaims));
					service.claims$.subscribe(claims => {
						expect(claims).toEqual(testClaims);
						done();
					});
					service.loadClaims();
				});

				// describe('with autoLogin', () => {
				// 	it('should call authorize', () => {
				// 		service.loadClaims();
				// 		expect(auth.authorize).toHaveBeenCalled();
				// 	});
				// 	it('should not call getUserData', () => {
				// 		service.loadClaims();
				// 		expect(auth.getUserData).not.toHaveBeenCalled();
				// 	});
				// });
				// describe('without autoLogin', () => {
				// 	beforeEach(() => {
				// 		const config = TestBed.inject(OpenIdConfigService);
				// 		Object.defineProperty(config, 'autoLogin', {value: false});
				// 	});
				// 	it('should not call authorize', () => {
				// 		service.loadClaims();
				// 		expect(auth.authorize).not.toHaveBeenCalled();
				// 	});
				// 	it('should call getUserData', () => {
				// 		service.loadClaims();
				// 		expect(auth.getUserData).toHaveBeenCalled();
				// 	});
				// });
			});
		});

		describe('hasUserRole', () => {
			it('should return false without claims', () => {
				expect(service.hasUserRole('role', undefined)).toBe(false);
			});
			it('should return false without userroles', () => {
				expect(service.hasUserRole('role', {})).toBe(false);
			});
			it('should return false without "role" role', () => {
				expect(service.hasUserRole('role', {userroles: ['role']})).toBe(true);
			});
		});
	});
});
