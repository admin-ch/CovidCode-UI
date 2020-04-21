import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'shared/shared.module';
import {HomeComponent} from './home.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	declarations: [HomeComponent],
	imports: [SharedModule, RouterModule.forChild([{path: '', component: HomeComponent}]), MatButtonModule]
})
export class HomeModule {}
