import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyageDisplayPage } from './voyage-display.page';

const routes: Routes = [
  {
    path: '',
    component: VoyageDisplayPage,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyageDisplayPageRoutingModule { }
