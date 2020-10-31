import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [{
	path: '',
	component: PagesComponent,
	children: [
		{
			path: 'home',
			loadChildren: () => import('./home/home.module')
				.then(m => m.HomeModule),
		},
		// {
		// 	path: 'folder',
		// 	loadChildren: () => import('./folder/folder.module')
		// 		.then(m => m.FolderPageModule),
		// },
		// {
		// 	path: 'statistics',
		// 	loadChildren: () => import('./statistics/statistics.module')
		// 		.then(m => m.StatisticsModule),
		// },
		{ path: '', redirectTo: 'home', pathMatch: 'full' },
		{ path: '**', redirectTo: 'home' },
	],
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule { }
