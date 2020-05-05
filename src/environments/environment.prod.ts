export const environment = {
	production: true,
	showWarning: false,
	host: 'https://codegen-service.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: '/generate-code',
		stsServer: 'https://identity.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode.admin.ch/auth/login-feedback/',
		post_logout_redirect_uri: 'https://www.covidcode.admin.ch/',
		silentRenew: true,
		useAutoLogin: false,
		debug: false,
		token_aware_url_patterns: ['/v1/(authcode).*']
	}
};
