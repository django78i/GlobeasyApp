import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeLogPageRoutingModule } from './home-log-routing.module';

import { HomeLogPage } from './home-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeLogPageRoutingModule
  ],
  declarations: [HomeLogPage]
})
export class HomeLogPageModule {}
