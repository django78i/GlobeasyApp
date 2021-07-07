import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab4Page } from './tab4.page';

const routes: Routes = [
	{
		path: '',
		component: Tab4Page,
		children: [
			{
				path: 'chat-list',
				loadChildren: () => import('./chat-list/chat-list.module').then(m => m.ChatListPageModule)
			},
			{
				path: 'chat-conv',
				loadChildren: () => import('./chat-conv/chat-conv.module').then(m => m.ChatConvPageModule)
			},
			{
				path: '',
				redirectTo: 'chat-list',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: 'chat-list',
		pathMatch: 'full'
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class Tab4PageRoutingModule { }
