import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {GenerateCodeService} from './generate-code.service';
import {CodeComponent} from './code/code.component';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
	selector: 'ha-generate-code',
	templateUrl: './generate-code.component.html'
})
export class GenerateCodeComponent implements OnInit {
	test: FormGroup;
	today = moment();
	@ViewChild(FormGroupDirective) form: FormGroupDirective;

	constructor(private fb: FormBuilder, private dialog: MatDialog, private service: GenerateCodeService) {}

	ngOnInit(): void {
		this.test = this.fb.group({
			onsetDate: [undefined, [Validators.required]]
		});
	}

	save(isValid: boolean, value: {onsetDate: Moment}): void {
		if (isValid) {
			this.service
				.sendData({
					onsetDate: value.onsetDate.format('YYYY-MM-DD'),
					physicianCommonName: 'physicianCommonName',
					physicianEmail: 'physicianEmail',
					physicianLoginName: 'physicianLoginName'
				})
				.subscribe(authorisationCode => this.dialog.open(CodeComponent, {data: authorisationCode}));
			this.form.resetForm();
		}
	}
}
