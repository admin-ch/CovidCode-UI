import {RouterModule, Routes} from '@angular/router';
import {AutoLoginComponent} from './auto-login/auto-login.component';
import {NgModule} from '@angular/core';

const routes: Routes = [{path: '', component: AutoLoginComponent}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthglobalRoutingModule {}
