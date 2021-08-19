import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatListPageRoutingModule } from './chat-list-routing.module';

import { ChatListPage } from './chat-list.page';
import { TimeTransPipe } from 'src/app/pipe/time-trans.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatListPageRoutingModule
  ],
  declarations: [
    ChatListPage,
    TimeTransPipe
  ]
})
export class ChatListPageModule { }
