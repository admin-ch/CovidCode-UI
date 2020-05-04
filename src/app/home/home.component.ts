import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
	selector: 'ha-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	// tslint:disable-next-line:no-host-metadata-property
	host: {class: 'content'}
})
export class HomeComponent {
	bagURL =
		'https://www.bag.admin.ch/bag/LANG/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov.html';
	lang$: Observable<string>;
	showWarning = environment.showWarning;

	constructor(translate: TranslateService) {
		this.lang$ = translate.onLangChange.pipe(
			map(lang => lang.lang),
			startWith(translate.currentLang)
		);
	}
}
