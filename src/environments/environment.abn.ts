// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: true,
	showWarning: true,
	host: 'https://codegen-service-a.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts-a.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode-a.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: '/generate-code',
		stsServer: 'https://identity-a.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode-a.admin.ch/auth/login-feedback/',
		post_logout_redirect_uri: 'https://www.covidcode-a.admin.ch/',
		silentRenew: true,
		useAutoLogin: false,
		debug: false,
		token_aware_url_patterns: ['/v1/(authcode).*']
	}
};
