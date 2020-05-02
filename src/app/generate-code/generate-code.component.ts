import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {GenerateCodeService} from './generate-code.service';
import {CodeComponent} from './code/code.component';
import {Moment} from 'moment';
import * as moment from 'moment';

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
	startDate = moment().subtract(4, 'weeks');
	@ViewChild(FormGroupDirective) form: FormGroupDirective;

	constructor(
		private readonly fb: FormBuilder,
		private readonly dialog: MatDialog,
		private readonly service: GenerateCodeService
	) {}

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
					this.dialog.open(CodeComponent, {
						data: {code: authorisationCode, date: value.onsetDate.format('DD.MM.YYYY')},
						disableClose: true
					})
				);
			this.form.resetForm();
		}
	}
}
