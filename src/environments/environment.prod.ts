import {OIdC} from '../app/auth/open-id-config-service';
import {LogLevel} from 'angular-auth-oidc-client';

export const environment = {
	production: true,
	showWarning: false,
	stage: '',
	host: 'https://codegen-service.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: 'generate-code',
		stsServer: 'https://identity.bit.admin.ch/realms/bag-pts',
		applicationUrl: 'https://www.covidcode.admin.ch/',
		loginFeedback: 'auth/login-feedback/',
		silentRenew: true,
		useAutoLogin: false,
		debug: LogLevel.None,
		tokenAwareUrlPatterns: ['/v1/(authcode).*']
	} as OIdC
};
