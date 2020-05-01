import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ObliqueModule} from '@oblique/oblique';
import {AutoLoginComponent} from './auto-login.component';
import {LoginFeedbackComponent} from './login-feedback.component';

const routes: Routes = [
	{path: 'auto-login', component: AutoLoginComponent},
	{path: 'login-feedback', component: LoginFeedbackComponent}
];

@NgModule({
	declarations: [AutoLoginComponent, LoginFeedbackComponent],
	imports: [CommonModule, RouterModule.forChild(routes), TranslateModule, ObliqueModule, ReactiveFormsModule]
})
export class AuthModule {}
