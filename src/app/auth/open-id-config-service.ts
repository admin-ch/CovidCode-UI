import {Injectable} from '@angular/core';
import {OpenIdConfiguration} from 'angular-auth-oidc-client';
import {environment} from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OpenIdConfigService {
	readonly config: OpenIdConfiguration = {
		client_id: environment.oidc.clientId,
		stsServer: environment.oidc.stsServer,
		redirect_url: environment.oidc.applicationUrl,
		silent_renew_url: environment.oidc.applicationUrl + 'assets/auth/silent-refresh.html',
		post_logout_redirect_uri: environment.oidc.post_logout_redirect_uri,
		post_login_route: '/' + environment.oidc.afterLoginPath,
		log_console_debug_active: environment.oidc.debug,
		response_type: 'code',
		start_checksession: false,
		silent_renew: environment.oidc.silentRenew,
		auto_userinfo: true
	};

	get stsStagingUrl(): string {
		return environment.oidc.stsServer;
	}

	get autoLogin(): boolean {
		return environment.oidc.useAutoLogin;
	}

	get urlPattern(): string[] {
		return environment.oidc.token_aware_url_patterns;
	}
}
