import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ObUnknownRouteModule} from '@oblique/oblique';

const routes: Routes = [
	{
		path: 'generate-code',
		loadChildren: () => import('./generate-code/generate-code.module').then(m => m.GenerateCodeModule)
	},
	{path: '', redirectTo: 'generate-code', pathMatch: 'full'},
	{path: '**', redirectTo: 'unknown-route'}
];

@NgModule({
	imports: [ObUnknownRouteModule, RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
