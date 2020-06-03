import {OIdC} from '../app/auth/open-id-config-service';

export const environment = {
	production: true,
	showWarning: true,
	host: 'https://codegen-service-a.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts-a.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode-a.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: 'generate-code',
		stsServer: 'https://identity-a.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode-a.admin.ch/',
		loginFeedback: 'auth/login-feedback/',
		silentRenew: true,
		useAutoLogin: false,
		debug: false,
		tokenAwareUrlPatterns: ['/v1/(authcode).*']
	} as OIdC
};
