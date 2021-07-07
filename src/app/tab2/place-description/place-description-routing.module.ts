import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceDescriptionPage } from './place-description.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceDescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceDescriptionPageRoutingModule {}
