import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestResponsPageRoutingModule } from './request-respons-routing.module';

import { RequestResponsPage } from './request-respons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestResponsPageRoutingModule
  ],
  declarations: [RequestResponsPage]
})
export class RequestResponsPageModule {}
