import {OIdC} from '../app/auth/open-id-config-service';
import {LogLevel} from 'angular-auth-oidc-client';

export const environment = {
	production: true,
	showWarning: true,
	host: 'https://codegen-service-t.bag.admin.ch',
	eiamSelfAdmin:
		'https://sts-a.pts.admin.ch/_pep/myaccount?returnURL=https%3A%2F%2Fwww.covidcode-t.admin.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui',
		afterLoginPath: 'generate-code',
		stsServer: 'https://identity-a.bit.admin.ch/realms/bag-pts-test',
		applicationUrl: 'https://www.covidcode-t.admin.ch/',
		loginFeedback: 'auth/login-feedback/',
		silentRenew: true,
		useAutoLogin: false,
		debug: LogLevel.None,
		tokenAwareUrlPatterns: ['/v1/(authcode).*']
	} as OIdC
};
