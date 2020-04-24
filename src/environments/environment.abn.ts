// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	host: 'https://codegen-service-a.bag.admin.ch',
	eiamSelfAdmin: 'https://sts-a.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.codegen-a.bag.admin.ch',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: '/generate-code',
		stsServer: 'https://identity-a.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode-a.admin.ch/',
		post_logout_redirect_uri: 'https://www.covidcode-a.admin.ch/',
		silentRenew: false,
		useAutoLogin: false,
		debug: true,
		token_aware_url_patterns: ['/v1/(authcode).*']
	}
};
