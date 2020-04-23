import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {GenerateCodeService} from './generate-code.service';
import {CodeComponent} from './code/code.component';
import {Moment} from 'moment';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {OauthService} from '../authglobal/oauth.service';

@Component({
	selector: 'ha-generate-code',
	templateUrl: './generate-code.component.html',
	styleUrls: ['./generate-code.component.scss'],
	// tslint:disable-next-line:no-host-metadata-property
	host: {class: 'content'}
})
export class GenerateCodeComponent implements OnInit {
	test: FormGroup;
	today = moment();
	@ViewChild(FormGroupDirective) form: FormGroupDirective;
	isAuthenticated$: Observable<boolean>;

	constructor(
		private fb: FormBuilder,
		private dialog: MatDialog,
		private service: GenerateCodeService,
		private readonly oauthService: OauthService
	) {
		this.isAuthenticated$ = this.oauthService.isAuthenticated$;
	}

	ngOnInit(): void {
		this.test = this.fb.group({
			onsetDate: [undefined, [Validators.required]]
		});
	}

	save(isValid: boolean, value: {onsetDate: Moment}): void {
		if (isValid) {
			this.service
				.sendData({
					onsetDate: value.onsetDate.format('YYYY-MM-DD')
				})
				.subscribe(authorisationCode =>
					this.dialog.open(CodeComponent, {data: authorisationCode, disableClose: true})
				);
			this.form.resetForm();
		}
	}
}
