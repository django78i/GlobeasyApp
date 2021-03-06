import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyageDisplayPageRoutingModule } from './voyage-display-routing.module';

import { VoyageDisplayPage } from './voyage-display.page';
import { NgxStarRatingModule } from 'ngx-star-rating'
import { PhotoModule } from 'src/app/modules/photo.module';
import { AccordeonModule } from 'src/app/modules/accordeon/accordeon.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyageDisplayPageRoutingModule,
    NgxStarRatingModule,
    PhotoModule,
    AccordeonModule
  ],
  declarations: [VoyageDisplayPage]
})
export class VoyageDisplayPageModule {}
