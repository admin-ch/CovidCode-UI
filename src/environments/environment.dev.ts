import {OIdC} from '../app/auth/open-id-config-service';

export const environment = {
	production: true,
	showWarning: true,
	host: 'https://codegen-service-d.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts-r.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode-d.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: 'generate-code',
		stsServer: 'https://identity-r.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode-d.admin.ch/',
		loginFeedback: 'auth/login-feedback/',
		silentRenew: true,
		useAutoLogin: false,
		debug: true,
		tokenAwareUrlPatterns: ['/v1/(authcode).*']
	} as OIdC
};
