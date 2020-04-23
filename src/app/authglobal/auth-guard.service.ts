import {Inject, Injectable} from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	CanLoad,
	Route,
	Router,
	RouterStateSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {WINDOW} from '@oblique/oblique';
import {Claims, OauthService} from './oauth.service';

export enum Role {
	HaUI = 'bag-pts-allow'
}

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
	constructor(
		private readonly oauthService: OauthService,
		private readonly router: Router,
		@Inject(WINDOW) private readonly window
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.checkExpectedRole(route, true);
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.checkExpectedRole(childRoute, true);
	}

	canLoad(route: Route): Observable<boolean> {
		return this.checkExpectedRole(route, true);
	}

	private checkExpectedRole(route, redirect: boolean): Observable<boolean> {
		return this.oauthService.claims$.pipe(
			take(1),
			map(result => this.checkExpectedRoleAfterAuthentication(result, redirect))
		);
	}

	private checkExpectedRoleAfterAuthentication(claims: Claims, redirect: boolean): boolean {
		if (!claims) {
			if (redirect) {
				this.router.navigate(['autologin']);
			}
			return false;
		}

		const hasAccess = this.oauthService.hasUserRole(Role.HaUI, claims);
		if (!hasAccess) {
			if (redirect) {
				this.window.href = 'https://www.eiam.admin.ch/403pts';
			}
		}
		return hasAccess;
	}
}
