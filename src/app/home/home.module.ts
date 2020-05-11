import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from 'shared/shared.module';
import {HomeComponent} from './home.component';

@NgModule({
	declarations: [HomeComponent],
	imports: [
		SharedModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomeComponent
			}
		]),
		MatButtonModule,
		MatCardModule
	]
})
export class HomeModule {}
