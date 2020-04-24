import {AfterViewInit, Component, Inject} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map, startWith} from 'rxjs/operators';
import {ObHttpApiInterceptorEvents, ObOffCanvasService} from '@oblique/oblique';
import {OauthService} from './authglobal/oauth.service';

@Component({
	selector: 'ha-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
	isAuthenticated$: Observable<boolean>;
	opened$: Observable<string>;
	name$: Observable<string>;
	eIAMSelfAdminRedirect: Observable<string>;

	constructor(
		offCanvas: ObOffCanvasService,
		private readonly oauthService: OauthService,
		@Inject('EIAM_SELF_ADMIN') public eIAMSelfAdmin: string,
		interceptor: ObHttpApiInterceptorEvents,
		router: Router
	) {
		this.eIAMSelfAdminRedirect = router.events.pipe(
			filter(evt => evt instanceof NavigationEnd),
			map((evt: NavigationEnd) => evt.url)
		);
		this.opened$ = offCanvas.opened.pipe(
			startWith(false),
			map(opened => (opened ? 'help.tooltip.in' : 'help.tooltip.out'))
		);
		// setTimeout to avoid ExpressionHasBeenChangedAfterItHasBeenCheckedError
		setTimeout(() => (this.isAuthenticated$ = this.oauthService.isAuthenticated$));
		this.name$ = this.oauthService.name$;

		interceptor.sessionExpired.subscribe(() => this.logout());
	}

	ngAfterViewInit(): void {
		this.oauthService.initialize();
		this.oauthService.pamsLoginStatus();
	}

	logout(): void {
		this.oauthService.logout();
	}
}
