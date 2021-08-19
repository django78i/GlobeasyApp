import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-chat-from-request',
  templateUrl: './chat-from-request.component.html',
  styleUrls: ['./chat-from-request.component.scss'],
})
export class ChatFromRequestComponent implements OnInit {


  @Input() room;
  room$: Observable<any>;
  messages$: Observable<any[]>;
  messageText: any;
  user: any;


  constructor(
    public chatService: ChatService,
    public modalController: ModalController,
    public uService: UserServiceService,
    public afs: AngularFirestore,
    public auth: AngularFireAuth

  ) { }

  async ngOnInit() {
    const dat = await this.uService.getMobileUserFromStorage()
		this.user = JSON.parse(dat);
    console.log(this.room)
    this.room$ = this.chatService.findRoom(this.room.users[0], this.room.users[1])
      .pipe(
        tap(r => this.messages$ = this.chatService.findMessages(r.uid)
        )
      );
      
  }

  sendMessage(room) {
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
    this.chatService.saveMessage(msg, room);
    this.messageText = null;
  }


  dismiss() {
    this.modalController.dismiss();
  }

}
