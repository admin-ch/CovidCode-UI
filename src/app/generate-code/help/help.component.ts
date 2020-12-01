import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {first, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
	selector: 'ha-help',
	templateUrl: './help.component.html'
})
export class HelpComponent {
	bullets$: Observable<string[]>;

	constructor(translate: TranslateService) {
		this.bullets$ = translate.onLangChange.pipe(
			first(),
			startWith(translate.currentLang),
			switchMap(() => translate.getTranslation(translate.currentLang)),
			map(data => Object.keys(data)),
			map(keys => keys.filter(key => key.indexOf('generate-code.help.info') === 0))
		);
	}
}
