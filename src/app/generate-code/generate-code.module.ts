import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {ObErrorMessagesModule, ObInputClearModule} from '@oblique/oblique';
import {SharedModule} from 'shared/shared.module';
import {GenerateCodeComponent} from './generate-code.component';
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
		MatMomentDateModule,
		ObErrorMessagesModule,
		ObInputClearModule
	]
})
export class GenerateCodeModule {}
