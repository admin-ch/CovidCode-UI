import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {DateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {TranslateService} from '@ngx-translate/core';
import {map, startWith} from 'rxjs/operators';
import {ObErrorMessagesModule} from '@oblique/oblique';
import {SharedModule} from 'shared/shared.module';
import {GenerateCodeComponent} from './generate-code.component';
import {CodeComponent} from './code/code.component';
import {AuthGuardService} from '../auth/auth-guard.service';
import {HelpComponent} from './help/help.component';

@NgModule({
	declarations: [GenerateCodeComponent, CodeComponent, HelpComponent],
	imports: [
		SharedModule,
		RouterModule.forChild([{path: '', component: GenerateCodeComponent, canActivate: [AuthGuardService]}]),
		MatButtonModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		MatMomentDateModule,
		ObErrorMessagesModule,
		MatCardModule
	]
})
export class GenerateCodeModule {
	constructor(adapter: DateAdapter<any>, translate: TranslateService) {
		translate.onLangChange
			.pipe(
				map(lang => lang.lang),
				startWith(translate.currentLang),
				map(lang => (lang === 'en' ? 'en-GB' : `${lang}-CH`))
			)
			.subscribe(locale => adapter.setLocale(locale));
	}
}
