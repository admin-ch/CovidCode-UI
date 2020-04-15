import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {SharedModule} from 'shared/shared.module';
import {GenerateCodeComponent} from './generate-code.component';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {ObErrorMessagesModule, ObInputClearModule} from '@oblique/oblique';
import {CodeComponent} from './code/code.component';

@NgModule({
	declarations: [GenerateCodeComponent, CodeComponent],
	imports: [
		SharedModule,
		RouterModule.forChild([{path: '', component: GenerateCodeComponent}]),
		MatButtonModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatNativeDateModule,
		ObErrorMessagesModule,
		ObInputClearModule
	]
})
export class GenerateCodeModule {}
