// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	host: 'https://codegen-service-d.bag.admin.ch',
	eiamSelfAdmin: 'https://sts-r.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode-d.admin.ch',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: '/generate-code',
		stsServer: 'https://identity-r.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode-d.admin.ch/',
		post_logout_redirect_uri: 'https://www.covidcode-d.admin.ch/',
		silentRenew: false,
		useAutoLogin: false,
		debug: true,
		token_aware_url_patterns: ['/v1/(authcode).*']
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
