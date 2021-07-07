import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLogPage } from './home-log.page';

const routes: Routes = [
  {
    path: '',
    component: HomeLogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLogPageRoutingModule {}
