import {OIdC} from '../app/auth/open-id-config-service';

export const environment = {
	production: false,
	showWarning: true,
	host: 'http://localhost:8113',
	eiamSelfAdmin: 'https://eiam.chCURRENT_PAGE&language=LANGUAGE',
	oidc: {
		clientId: 'ha-ui-web-client',
		afterLoginPath: 'generate-code',
		stsServer: 'http://localhost:8180',
		applicationUrl: 'http://localhost:4200/',
		loginFeedback: 'auth/login-feedback/',
		silentRenew: true,
		useAutoLogin: false,
		debug: true,
		tokenAwareUrlPatterns: ['/v1/(authcode).*']
	} as OIdC
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
