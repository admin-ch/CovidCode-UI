import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {OauthService} from '../auth/oauth.service';
import {environment} from '../../environments/environment';

@Component({
	selector: 'ha-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	// tslint:disable-next-line:no-host-metadata-property
	host: {class: 'content'}
})
export class HomeComponent {
	lang$: Observable<string>;
	showWarning = environment.showWarning;

	constructor(translate: TranslateService, route: ActivatedRoute, oauthService: OauthService) {
		route.data.pipe(filter(data => data.logout)).subscribe(() => oauthService.logout());
		this.lang$ = translate.onLangChange.pipe(
			map(lang => lang.lang),
			startWith(translate.currentLang)
		);
	}
}
