import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TranslateModule} from '@ngx-translate/core';
import {
	multiTranslateLoader,
	ObHttpApiInterceptor,
	ObMasterLayoutConfig,
	ObMasterLayoutModule,
	ObOffCanvasModule
} from '@oblique/oblique';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import localeFRCH from '@angular/common/locales/fr-CH';
import localeITCH from '@angular/common/locales/it-CH';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule, ConfigResult, OidcConfigService, OidcSecurityService} from 'angular-auth-oidc-client';
import {OpenIdConfigService} from './authglobal/open-id-config-service';
import {HttpConfigInterceptor} from './authglobal/http.config.interceptor';
import {EiamSelfAdminComponent} from './eiam-self-admin/eiam-self-admin.component';

export function loadConfig(oidcConfigService: OidcConfigService, oidConfigService: OpenIdConfigService) {
	return () => oidcConfigService.load_using_stsServer(oidConfigService.getStsStagingUrl());
}

registerLocaleData(localeDECH);
registerLocaleData(localeFRCH);
registerLocaleData(localeITCH);

@NgModule({
	declarations: [AppComponent, EiamSelfAdminComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		TranslateModule.forRoot(multiTranslateLoader()),
		AuthModule.forRoot(),
		ObMasterLayoutModule,
		ObOffCanvasModule,
		MatTooltipModule
	],
	providers: [
		{provide: LOCALE_ID, useValue: 'de-CH'},
		{provide: HTTP_INTERCEPTORS, useClass: ObHttpApiInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true},
		OidcConfigService,
		{
			provide: APP_INITIALIZER,
			useFactory: loadConfig,
			deps: [OidcConfigService, OpenIdConfigService],
			multi: true
		}
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
	constructor(
		private readonly config: ObMasterLayoutConfig,
		private readonly oidcSecurityService: OidcSecurityService,
		private readonly oidcConfigService: OidcConfigService,
		private readonly openIdConfigService: OpenIdConfigService
	) {
		config.layout.hasMainNavigation = false;
		config.locale.locales = [
			{id: 'locale-de_button', locale: 'de'},
			{id: 'locale-fr_button', locale: 'fr'},
			{id: 'locale-it_button', locale: 'it'},
			{id: 'locale-en_button', locale: 'en'}
		];
		openIdConfigService.oidConfig().subscribe(openIdConfig => {
			this.oidcConfigService.onConfigurationLoaded.subscribe((configResult: ConfigResult) => {
				this.oidcSecurityService.setupModule(openIdConfig, configResult.authWellknownEndpoints);
			});
		});
	}
}
