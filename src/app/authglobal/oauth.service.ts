import {Injectable} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {Observable, ReplaySubject} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {environment} from '../../environments/environment';

export interface Claims {
	acr: string;
	aud: string;
	auth_time: number;
	azp: string;
	email_verified: boolean;
	exp: number;
	displayName?: string;
	name?: string;
	iat: number;
	iss: string;
	jti: string;
	nbf: number;
	nonce: string;
	preferred_username: string;
	session_state: string;
	sub: string;
	typ: string;
	allowedOrigins: string[];
	realmAccess: {
		roles: string[];
	};
	resourceAccess: {
		account: {
			roles: string[];
		};
	};
	scope: string;
	ctx: string;
}

@Injectable({
	providedIn: 'root'
})
export class OauthService {
	name$: Observable<string>;
	claims$ = new ReplaySubject<Claims>(1);
	isAuthenticated$ = new ReplaySubject<boolean>(1);

	protected constructor(private readonly oidcSecurityService: OidcSecurityService) {
		this.name$ = this.claims$.pipe(map(result => result.displayName || result.name));
	}

	logout() {
		this.oidcSecurityService.logoff();
	}

	login() {
		this.oidcSecurityService.authorize();
	}

	initialize() {
		if (this.oidcSecurityService.moduleSetup) {
			this.authenticationSetup();
		} else {
			this.oidcSecurityService.onModuleSetup.subscribe(() => this.authenticationSetup());
		}
	}

	public pamsLoginStatus() {
		// In case of each login event your authentication status has to be checked
		this.oidcSecurityService
			.getIsAuthorized()
			.pipe(take(1))
			.subscribe(result => {
				// tslint:disable-next-line:no-console
				console.log('PAMS authorization is now', '??', 'and local is', result);
				if (result && false) {
					// tslint:disable-next-line:no-console
					console.log('You are not logged-in in PAMS no more, log out out here as well');
					this.oidcSecurityService.logoff();
					return;
				}

				if (!result && environment.oidc.useAutoLogin) {
					// tslint:disable-next-line:no-console
					console.log('You are not logged in but this site required login');
					this.oidcSecurityService.authorize();
					return;
				}
				this.oidcSecurityService.getIsAuthorized().subscribe(login => {
					// tslint:disable-next-line:no-console
					console.log('Authentication Status is', result);
					this.isAuthenticated$.next(login);
				});
				this.oidcSecurityService.getUserData<Claims>().subscribe(claims => {
					this.oidcSecurityService
						.getIsAuthorized()
						.pipe(take(1))
						.subscribe(login => {
							if (login && !claims) {
								// tslint:disable-next-line:no-console
								console.log('Empty claims but login, ignore');
								return;
							}
							if (!login && claims) {
								// tslint:disable-next-line:no-console
								console.log('Non empty claims but no login, ignore');
								return;
							}
							// tslint:disable-next-line:no-console
							console.log('User Data is ', claims);
							this.claims$.next(claims as Claims);
						});
				});
			});
	}

	hasUserRole(role: string, claims: any): boolean {
		return claims && claims.realmAccess && claims.realmAccess.roles && claims.realmAccess.roles.includes(role);
	}

	private authenticationSetup() {
		this.oidcSecurityService.authorizedCallbackWithCode(window.location.toString());
	}
}
