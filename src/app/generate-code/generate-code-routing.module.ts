import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GenerateCodeComponent} from './generate-code.component';
import {AuthGuardService} from '../authglobal/auth-guard.service';

const routes: Routes = [
	{
		path: 'code',
		component: GenerateCodeComponent,
		canActivate: [AuthGuardService]
	},
	{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GenerateCodeRoutingModule {}
