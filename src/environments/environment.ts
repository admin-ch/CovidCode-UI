// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	host: 'http://localhost:8113',
	oidc: {
		// The clientID as used in keycloak or mock server
		clientId: 'ha-ui-web-client',
		// Site to open after successful login
		afterLoginPath: 'generate-code',
		// Path to the login server
		stsServer: 'http://localhost:8180',
		// The URL of this application, used e.g. for redirect URLs
		applicationUrl: 'http://localhost:4200/',
		// The URL to go to after a logout, e.g, e-portal
		post_logout_redirect_uri: 'http://localhost:4200/',
		// Use silent-renew. In prod this should be used, but with mock server it does not work
		silentRenew: false,
		// Is the user always required to log in?
		useAutoLogin: false,
		// Enable debug output of the oidc library
		debug: true,
		// URL that will get the JWT.
		// NOTE: NEVER send this token to other backends than your own!
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
