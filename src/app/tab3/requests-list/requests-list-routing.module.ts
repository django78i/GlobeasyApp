import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsListPage } from './requests-list.page';

const routes: Routes = [
  {
    path: '',
    component: RequestsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestsListPageRoutingModule {}
