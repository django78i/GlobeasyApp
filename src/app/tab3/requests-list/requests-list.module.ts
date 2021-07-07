import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsListPageRoutingModule } from './requests-list-routing.module';

import { RequestsListPage } from './requests-list.page';
import { FicheRequeteComponent } from 'src/app/components/fiche-requete/fiche-requete.component';
import { PhotoModule } from 'src/app/modules/photo.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestsListPageRoutingModule,
    PhotoModule
  ],
  declarations: [RequestsListPage]
})
export class RequestsListPageModule {}
