import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-chat-pop-up',
  templateUrl: './chat-pop-up.component.html',
  styleUrls: ['./chat-pop-up.component.scss'],
})
export class ChatPopUpComponent implements OnInit {

  @Input() room;
  messageText: any;
  user: Observable<any>;
  messages$: Observable<any[]>;

  constructor(
    public chatService: ChatService,
    public modalController: ModalController,
    public uService: UserServiceService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {
    console.log(this.room)
    this.messages$ = this.chatService.findMessages(this.room.uid)
  }

  ngAfterViewInit() {
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  sendMessage() {
    const id = this.afs.createId();
    const user = this.room.users.find(u => u.uid != this.room.userConnect.uid)
    const msg = {
      date: new Date(),
      text: this.messageText,
      uid: id,
      senderUid: user.uid,
      senderName: user.name,
      recipientId: this.room.userConnect.uid,
      recipientName: this.room.userConnect.name,
      type: 'message'
    }
    this.chatService.saveMessage(msg, this.room);
    this.messageText = null;
  }


}
