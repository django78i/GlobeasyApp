import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDescriptionPageRoutingModule } from './place-description-routing.module';

import { PlaceDescriptionPage } from './place-description.page';
import { PhotoModule } from '../../modules/photo.module';
import { AgmCoreModule } from '@agm/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDescriptionPageRoutingModule,
    PhotoModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH2CoK4mxMy4nyas7Q2eJ-09DdJkEJbOU'
    }),
    MatChipsModule,
    MatTabsModule
  ],
  declarations: [PlaceDescriptionPage]
})
export class PlaceDescriptionPageModule { }
