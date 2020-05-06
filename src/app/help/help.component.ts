import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {first, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
	selector: 'ha-help',
	templateUrl: './help.component.html'
})
export class HelpComponent {
	paragraph$: Observable<string[]>;

	constructor(translate: TranslateService) {
		this.paragraph$ = translate.onLangChange.pipe(
			first(),
			switchMap(() => translate.getTranslation(translate.currentLang)),
			map(data => Object.keys(data)),
			map(keys => keys.filter(key => key.indexOf('help.text') === 0))
		);
	}
}
