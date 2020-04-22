import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ObliqueTestingModule} from '@oblique/oblique';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, ObliqueTestingModule],
			declarations: [AppComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [
				{provide: 'EIAM_SELF_ADMIN', useValue: ''},
				{provide: OidcSecurityService, useValue: {}}
			]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
