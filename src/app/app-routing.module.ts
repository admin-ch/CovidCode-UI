import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './auth/auth-guard.service';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'generate-code',
		loadChildren: () => import('./generate-code/generate-code.module').then(m => m.GenerateCodeModule),
		canLoad: [AuthGuardService],
		canActivate: [AuthGuardService]
	},
	{path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
	exports: [RouterModule]
})
export class AppRoutingModule {}
