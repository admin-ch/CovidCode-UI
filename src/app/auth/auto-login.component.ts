import {Component, OnInit} from '@angular/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
	selector: 'ha-auto-component',
	templateUrl: './empty.component.html'
})
export class AutoLoginComponent implements OnInit {
	constructor(private readonly securityService: OidcSecurityService) {
		if (this.securityService.moduleSetup) {
			this.onModuleSetup();
		} else {
			this.securityService.onModuleSetup.subscribe(() => {
				this.onModuleSetup();
			});
		}
	}

	ngOnInit() {
		if (this.securityService.moduleSetup) {
			this.onModuleSetup();
		}
	}

	private onModuleSetup() {
		this.securityService.authorize();
	}
}
