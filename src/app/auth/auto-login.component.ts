import {Component} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {OauthService} from './oauth.service';

@Component({
	selector: 'ha-auto-component',
	templateUrl: './empty.component.html'
})
export class AutoLoginComponent {
	constructor(securityService: OidcSecurityService, oauth: OauthService) {
		oauth.setup$.subscribe(() => securityService.authorize());
	}
}
