import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {multiTranslateLoader, ObHttpApiInterceptor, ObMasterLayoutModule} from '@oblique/oblique';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ObMasterLayoutModule,
		HttpClientModule,
		TranslateModule.forRoot(multiTranslateLoader())
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: ObHttpApiInterceptor, multi: true},
		{provide: LOCALE_ID, useValue: 'de-CH'}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
