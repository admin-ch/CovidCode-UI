import {RouterModule, Routes} from '@angular/router';
import {AutoLoginComponent} from './auto-login/auto-login.component';
import {NoAccessComponent} from './no-access/no-access.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
	{
		path: '',
		component: AutoLoginComponent
	},
	{
		path: 'forbidden',
		component: NoAccessComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthglobalRoutingModule {}
