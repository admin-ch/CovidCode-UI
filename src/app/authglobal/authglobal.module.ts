import {NgModule} from '@angular/core';
import {AutoLoginComponent} from './auto-login/auto-login.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {ObliqueModule} from '@oblique/oblique';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthglobalRoutingModule} from './authglobal-routing.module';

@NgModule({
	declarations: [AutoLoginComponent],
	imports: [CommonModule, AuthglobalRoutingModule, TranslateModule, ObliqueModule, ReactiveFormsModule]
})
export class AuthglobalModule {}
