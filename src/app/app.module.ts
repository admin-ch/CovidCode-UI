import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';
import {registerLocaleData} from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import localeFRCH from '@angular/common/locales/fr-CH';
import localeITCH from '@angular/common/locales/it-CH';
import localeENGB from '@angular/common/locales/en-GB';
import {TranslateModule} from '@ngx-translate/core';
import {
	multiTranslateLoader,
	ObDocumentMetaService,
	ObHttpApiInterceptor,
	ObHttpApiInterceptorConfig,
	ObMasterLayoutConfig,
	ObMasterLayoutModule,
	ObOffCanvasModule
} from '@oblique/oblique';
import {AuthModule, OidcConfigService} from 'angular-auth-oidc-client';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OpenIdConfigService} from './auth/open-id-config-service';
import {HttpConfigInterceptor} from './auth/http.config.interceptor';
import {EiamSelfAdminComponent} from './eiam-self-admin/eiam-self-admin.component';
import {HelpComponent} from './help/help.component';

export function loadConfig(oidcConfigService: OidcConfigService, openIdConfigService: OpenIdConfigService) {
	return () => oidcConfigService.withConfig(openIdConfigService.config);
}

registerLocaleData(localeDECH);
registerLocaleData(localeFRCH);
registerLocaleData(localeITCH);
registerLocaleData(localeENGB);

@NgModule({
	declarations: [AppComponent, EiamSelfAdminComponent, HelpComponent],
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
		meta: ObDocumentMetaService,
		interceptor: ObHttpApiInterceptorConfig
	) {
		interceptor.api.url = '/v1/authcode';
		meta.titleSuffix = 'application.title';
		meta.description = 'application.description';
		config.layout.hasMainNavigation = false;
		config.locale.locales = [
			{id: 'locale-de_button', locale: 'de'},
			{id: 'locale-fr_button', locale: 'fr'},
			{id: 'locale-it_button', locale: 'it'},
			{id: 'locale-en_button', locale: 'en'}
		];
	}
}
