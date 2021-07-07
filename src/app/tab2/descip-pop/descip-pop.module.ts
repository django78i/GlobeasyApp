import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescipPopPageRoutingModule } from './descip-pop-routing.module';

import { DescipPopPage } from './descip-pop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescipPopPageRoutingModule
  ],
  declarations: [DescipPopPage]
})
export class DescipPopPageModule {}
