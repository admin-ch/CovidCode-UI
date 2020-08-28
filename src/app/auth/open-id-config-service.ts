import {Injectable} from '@angular/core';
import {OpenIdConfiguration} from 'angular-auth-oidc-client';
import {environment} from '../../environments/environment';

export interface OIdC {
	clientId: string;
	stsServer: string;
	applicationUrl: string;
	loginFeedback: string;
	afterLoginPath: string;
	silentRenew: boolean;
	useAutoLogin: boolean;
	debug: boolean;
	tokenAwareUrlPatterns: string[];
}

@Injectable({
	providedIn: 'root'
})
export class OpenIdConfigService {
	static readonly isAuthorizedTimeout = 2;
	readonly config: OpenIdConfiguration = {
		clientId: environment.oidc.clientId,
		stsServer: environment.oidc.stsServer,
		redirectUrl: `${environment.oidc.applicationUrl}environment.oidc.loginFeedback`,
		silentRenewUrl: `${environment.oidc.applicationUrl}assets/auth/silent-refresh.html`,
		postLogoutRedirectUri: environment.oidc.applicationUrl,
		postLoginRoute: `/${environment.oidc.afterLoginPath}`,
		// log_console_debug_active: environment.oidc.debug,
		responseType: 'code',
		startCheckSession: false,
		silentRenew: environment.oidc.silentRenew,
		autoUserinfo: true
		// isauthorizedrace_timeout_in_seconds: OpenIdConfigService.isAuthorizedTimeout
	};

	get stsStagingUrl(): string {
		return environment.oidc.stsServer;
	}

	get autoLogin(): boolean {
		return environment.oidc.useAutoLogin;
	}

	get urlPattern(): string[] {
		return environment.oidc.tokenAwareUrlPatterns;
	}
}
