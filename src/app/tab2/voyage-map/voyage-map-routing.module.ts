import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageMapPage } from './voyage-map.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageMapPageRoutingModule {}
