import {Component, Inject, Input, OnChanges} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ObUnsubscribable} from '@oblique/oblique';
import {takeUntil} from 'rxjs/operators';

@Component({
	selector: 'ha-eiam-self-admin',
	templateUrl: './eiam-self-admin.component.html'
})
export class EiamSelfAdminComponent extends ObUnsubscribable implements OnChanges {
	@Input() page: string;
	@Input() name: string;
	url: string;

	constructor(
		@Inject('EIAM_SELF_ADMIN') private readonly eIAMSelfAdmin: string,
		private readonly translate: TranslateService
	) {
		super();
		translate.onLangChange.pipe(takeUntil(this.unsubscribe)).subscribe(() => this.ngOnChanges());
	}

	ngOnChanges(): void {
		this.url = this.eIAMSelfAdmin
			.replace('CURRENT_PAGE', this.page)
			.replace('LANGUAGE', this.translate.currentLang);
	}
}
