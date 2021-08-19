import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { iif } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { ChatFromRequestComponent } from '../chat-from-request/chat-from-request.component';
import { ChatPopUpComponent } from '../chat-pop-up/chat-pop-up.component';

@Component({
	selector: 'app-pop-over',
	templateUrl: './pop-over.component.html',
	styleUrls: ['./pop-over.component.scss'],
})
export class PopOverComponent implements OnInit {

	@Input() user;
	@Input() contact;
	roomInfo: any;

	constructor(public modalController: ModalController,
		public navController: NavController,
		public chatService: ChatService,
		public popoverController: PopoverController

	) { }

	ngOnInit() {
		console.log(this.user)
	}

	navigate(nav) {
		console.log(nav);
		switch (nav) {
			case 'profil':
				this.navController.navigateForward(['tabs/tab5']);
			case 'chatter':
				this.chatPopUp();
		}
		this.popoverController.dismiss();

	}


	chatPopUp() {
		console.log("la");
		const prepar = this.prepareData();
		console.log(prepar);
		const room = this.chatService.findRoom(prepar.users[0], prepar.users[1])
			.pipe(
				tap(r => console.log(r)),
				tap(r => r ? r : this.chatService.createRoom(prepar)),
			);
		room.subscribe();
		console.log(localStorage.getItem('room'));
		const roomPop = {
			name: this.contact.name,
			uid: this.contact.uid,
			photo: "../../../assets/images/fogg-918.png"
		};

		const connect = { ...prepar, userConnect: roomPop }
		this.openModalChat(connect);

	}

	


	async openModalChat(room) {
		console.log(room)
		const modal = await this.modalController.create({
			component: ChatFromRequestComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'room': room
			}

		});
		return await modal.present();


	}


	prepareData() {
		const id = this.user.uid + this.contact.uid;
		console.log(this.user);
		console.log(this.contact);
		const users = [
			{
				name: this.user.displayName,
				uid: this.user.uid,
				photo: "../../../assets/images/fogg-918.png"
			},
			{
				name: this.contact.name,
				uid: this.contact.uid,
				photo: "../../../assets/images/fogg-918.png"
			}
		];
		const room = {
			uid: id,
			users: users,
			dateCreation: new Date()
		}

		return room;

	}


}
