import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestResponsPage } from './request-respons.page';

const routes: Routes = [
  {
    path: '',
    component: RequestResponsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestResponsPageRoutingModule {}
