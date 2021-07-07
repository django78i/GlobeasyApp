import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShareComponentComponent } from 'src/app/components/share-component/share-component.component';
import { ChatService } from 'src/app/services/chat.service';

@Component({
	selector: 'app-chat-conv',
	templateUrl: './chat-conv.page.html',
	styleUrls: ['./chat-conv.page.scss'],
})
export class ChatConvPage implements OnInit {

	messageText: any;
	userID: any;
	messages: any[] = [];
	nom: any;
	messagesSub: BehaviorSubject<any[]> = new BehaviorSubject(null);
	messagesObs$: Observable<any[]>;

	constructor(public navCtl: NavController, public modalController: ModalController, public chatService: ChatService) { }

	ngOnInit() {
		console.log(history.state.data.room);
		this.userID = "0123456789"
		this.messages = this.chatService.messages;
		this.nom = history.state.data.room.name;
		// this.messagesSub.next(this.chatService.messages);
	}


	sendMessage() {
		console.log('messageText: ' + this.messageText);
		console.log(this.userID);
		const date = new Date().toISOString();
		console.log(date);
		const user = {
			date: date,
			text: this.messageText,
			userId: this.userID,
			type : 'message'
		}
		this.messages.push(user);
		this.messageText = '';
	}


	navigateBack() {
		this.navCtl.navigateBack(['tabs/tab4/chat-list']);
	}


	navigate(g) {
		console.log(g);
		this.navCtl.navigateForward('tabs/tab2/place-description', { state: { data: { g } } });
	}



	async presentModal() {
		const modal = await this.modalController.create({
			component: ShareComponentComponent,
			cssClass: 'shareModal',
			// componentProps: {
			// 	'place': image
			// }
		});
		return await modal.present();
	}

}
