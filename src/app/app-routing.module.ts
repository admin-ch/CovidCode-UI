import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{
		path: 'generate-code',
		loadChildren: () => import('./generate-code/generate-code.module').then(m => m.GenerateCodeModule)
	},
	{path: '**', redirectTo: 'generate-code', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
