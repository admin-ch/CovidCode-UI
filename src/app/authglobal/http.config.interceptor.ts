import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Injectable, Injector} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
	private securityService: OidcSecurityService;

	constructor(private readonly injector: Injector) {}

	/**
	 * Sets token into header and initiates login in case of 401.
	 */
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// First check if this token should actually be sended.
		const shallSend =
			environment.oidc.token_aware_url_patterns.filter(pattern => request.url.match(pattern)).length > 0;
		if (!shallSend) {
			return next.handle(request);
		}

		if (this.securityService === undefined) {
			this.securityService = this.injector.get(OidcSecurityService);
		}

		if (this.securityService !== undefined) {
			const token = this.securityService.getToken();
			if (token !== '') {
				const tokenValue = 'Bearer ' + token;
				const requestToForward = request.clone({setHeaders: {Authorization: tokenValue}});
				return next.handle(requestToForward);
			}
		}

		return next.handle(request);
	}
}
