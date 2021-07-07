import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab5PageRoutingModule } from './tab5-routing.module';

import { Tab5Page } from './tab5.page';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { PhotoModule } from '../modules/photo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    MatTabsModule,
    PhotoModule
  ],
  declarations: [Tab5Page, DashboardComponent]
})
export class Tab5PageModule { }
