import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ObliqueModule} from '@oblique/oblique';
import {AutoLoginComponent} from './auto-login.component';

const routes: Routes = [{path: 'auto-login', component: AutoLoginComponent}];

@NgModule({
	declarations: [AutoLoginComponent],
	imports: [CommonModule, RouterModule.forChild(routes), TranslateModule, ObliqueModule, ReactiveFormsModule]
})
export class AuthModule {}
