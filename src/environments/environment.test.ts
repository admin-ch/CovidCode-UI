// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	showWarning: true,
	host: 'https://codegen-service-t.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts-a.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode-t.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: '/generate-code',
		stsServer: 'https://identity-a.bit.admin.ch/realms/bag-pts-test',
		applicationUrl: 'https://www.covidcode-t.admin.ch/auth/login-feedback/',
		post_logout_redirect_uri: 'https://www.covidcode-t.admin.ch/',
		silentRenew: true,
		useAutoLogin: false,
		debug: false,
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
