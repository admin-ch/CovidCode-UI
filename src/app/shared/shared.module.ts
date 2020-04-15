import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

const modules = [CommonModule, TranslateModule, ReactiveFormsModule];

@NgModule({
	declarations: [],
	imports: [...modules],
	exports: [...modules]
})
export class SharedModule {}
