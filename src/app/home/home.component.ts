import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
	selector: 'ha-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	// tslint:disable-next-line:no-host-metadata-property
	host: {class: 'content'}
})
export class HomeComponent {
	bagURL$: Observable<string>;

	constructor(translate: TranslateService) {
		this.bagURL$ = translate.onLangChange.pipe(
			map(lang => lang.lang),
			startWith(translate.currentLang),
			map(
				lang =>
					`https://www.bag.admin.ch/bag/${lang}/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov.html`
			)
		);
	}
}
