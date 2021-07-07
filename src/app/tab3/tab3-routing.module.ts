import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
	{
		path: '',
		component: Tab3Page,
		children: [
			{
				path: 'request-respons',
				loadChildren: () => import('./request-respons/request-respons.module').then(m => m.RequestResponsPageModule)
			},
			{
				path: 'requests-list',
				loadChildren: () => import('./requests-list/requests-list.module').then(m => m.RequestsListPageModule)
			},
			{
				path: '',
				redirectTo: 'requests-list',
				pathMatch: 'full'
			},
		]
	},
	{
		path: '',
		redirectTo: 'requests-list',
		pathMatch: 'full'
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class Tab3PageRoutingModule { }
