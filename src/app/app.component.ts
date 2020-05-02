import {AfterViewInit, Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {delay, filter, map, startWith} from 'rxjs/operators';
import {ObHttpApiInterceptorEvents, ObOffCanvasService} from '@oblique/oblique';
import {OauthService} from './auth/oauth.service';

@Component({
	selector: 'ha-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
	isAuthenticated$: Observable<boolean>;
	helpTooltip$: Observable<string>;
	name$: Observable<string>;
	currentPage$: Observable<string>;

	constructor(
		offCanvas: ObOffCanvasService,
		private readonly oauthService: OauthService,
		interceptor: ObHttpApiInterceptorEvents,
		router: Router
	) {
		this.name$ = this.oauthService.name$;
		this.isAuthenticated$ = this.oauthService.isAuthenticated$.pipe(delay(0));
		this.currentPage$ = router.events.pipe(
			filter(evt => evt instanceof NavigationEnd),
			map((evt: NavigationEnd) => evt.url)
		);
		this.helpTooltip$ = offCanvas.opened.pipe(
			startWith(false),
			map(opened => (opened ? 'help.tooltip.in' : 'help.tooltip.out'))
		);
		interceptor.sessionExpired.subscribe(() => this.logout());
	}

	ngAfterViewInit(): void {
		this.oauthService.initialize();
		this.oauthService.loadClaims();
	}

	logout(): void {
		this.oauthService.logout();
	}
}
