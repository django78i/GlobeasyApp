import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyageMapPageRoutingModule } from './voyage-map-routing.module';

import { VoyageMapPage } from './voyage-map.page';
import { AgmCoreModule } from '@agm/core';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyageMapPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH2CoK4mxMy4nyas7Q2eJ-09DdJkEJbOU'
    }),
    NgxStarRatingModule

  ],
  declarations: [VoyageMapPage]
})
export class VoyageMapPageModule {}
