import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {delay, filter, map, takeUntil} from 'rxjs/operators';
import {ObHttpApiInterceptorEvents, ObOffCanvasService} from '@oblique/oblique';
import {OauthService} from './auth/oauth.service';

@Component({
	selector: 'ha-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
	isAuthenticated$: Observable<boolean>;
	helpTooltip$: Observable<string>;
	name$: Observable<string>;
	currentPage: string;
	private readonly unsubscribe = new Subject();

	constructor(
		offCanvas: ObOffCanvasService,
		private readonly oauthService: OauthService,
		interceptor: ObHttpApiInterceptorEvents,
		router: Router
	) {
		this.name$ = this.oauthService.name$;
		this.isAuthenticated$ = this.oauthService.isAuthenticated$.pipe(delay(0));
		// no observable because of IE
		router.events
			.pipe(
				filter(evt => evt instanceof NavigationEnd),
				map((evt: NavigationEnd) => evt.url),
				takeUntil(this.unsubscribe)
			)
			.subscribe(url => (this.currentPage = url));
		interceptor.sessionExpired.subscribe(() => this.logout());
	}

	ngAfterViewInit(): void {
		this.oauthService.initialize();
		this.oauthService.loadClaims();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	logout(): void {
		this.oauthService.logout();
	}
}
