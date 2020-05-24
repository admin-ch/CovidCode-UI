// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,
	showWarning: true,
	host: 'http://172.18.50.35:84',
	eiamSelfAdmin:
		'http://172.18.50.35:8080',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: '/generate-code',
		stsServer: 'http://172.18.50.35:8080/realms/cv-covid-code',
		applicationUrl: 'http://172.18.50.35:4200/auth/login-feedback/',
		post_logout_redirect_uri: 'http://172.18.50.35:4200',
		silentRenew: true,
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
