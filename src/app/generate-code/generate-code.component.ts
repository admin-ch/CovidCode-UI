import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ObNotificationService} from '@oblique/oblique';
import {GenerateCodeService} from './generate-code.service';
import {GenerateCodeModel} from './generate-code.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CodeComponent} from './code/code.component';

@Component({
	selector: 'ha-generate-code',
	templateUrl: './generate-code.component.html'
})
export class GenerateCodeComponent implements OnInit {
	test: FormGroup;
	today = new Date();
	@ViewChild(FormGroupDirective) form: FormGroupDirective;

	constructor(private fb: FormBuilder, private dialog: MatDialog, private service: GenerateCodeService) {}

	ngOnInit(): void {
		this.test = this.fb.group({
			exposed: [undefined, [Validators.required]]
		});
	}

	save(isValid: boolean, value: GenerateCodeModel): void {
		if (isValid) {
			this.service
				.sendData(value)
				.subscribe(authorisationCode => this.dialog.open(CodeComponent, {data: authorisationCode}));
			this.form.resetForm();
		}
	}
}
