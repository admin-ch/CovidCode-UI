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
		client_id: environment.oidc.clientId,
		stsServer: environment.oidc.stsServer,
		redirect_url: environment.oidc.applicationUrl + environment.oidc.loginFeedback,
		silent_renew_url: environment.oidc.applicationUrl + 'assets/auth/silent-refresh.html',
		post_logout_redirect_uri: environment.oidc.applicationUrl,
		post_login_route: '/' + environment.oidc.afterLoginPath,
		log_console_debug_active: environment.oidc.debug,
		response_type: 'code',
		start_checksession: false,
		silent_renew: environment.oidc.silentRenew,
		auto_userinfo: true,
		isauthorizedrace_timeout_in_seconds: OpenIdConfigService.isAuthorizedTimeout
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
