import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
	selector: 'ha-code',
	templateUrl: './code.component.html',
	styleUrls: ['./code.component.scss']
})
export class CodeComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: number) {}
}
