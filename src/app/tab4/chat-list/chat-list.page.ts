import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ChatPopUpComponent } from 'src/app/components/chat-pop-up/chat-pop-up.component';
import { PopOverComponent } from 'src/app/components/pop-over/pop-over.component';
import { ChatService } from 'src/app/services/chat.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.page.html',
	styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

	locale: string = 'fr';
	roomsSub: BehaviorSubject<any[]> = new BehaviorSubject(null);
	roomsObs$: Observable<any[]>;
	custom: any;
	user: any;

	constructor(public navCtl: NavController,
		public modalController: ModalController,
		public chatService: ChatService,
		public auth: AngularFireAuth,
		public userService: UserServiceService
	) { }

	async ngOnInit() {
		const dat = await this.userService.getMobileUserFromStorage()
		this.user = JSON.parse(dat);

		this.roomsObs$ = this.chatService.roomList(this.user.uid)
			.pipe(
				map(rooms => {
					const roomFiltered = rooms.map(
						room => {
							const userFind = room.users.find(z => z.uid != this.user.uid);
							return { ...room, userConnect: userFind };
						}
					)
					console.log(roomFiltered);
					return roomFiltered;
				})
			);

	}


	// change(event) {
	// 	this.roomsObs$ = this.roomsSub.pipe(
	// 		map(r => event.detail.value == "" ? this.rooms : r.filter(r => r.name.toLowerCase().includes(event.detail.value.toLowerCase()))),
	// 		tap(dat => console.log(dat))
	// 	)
	// 	console.log(event.detail.value);
	// }

	async navigate(room) {
		console.log("la");

		console.log(room);
		const modal = await this.modalController.create({
			component: ChatPopUpComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'room': room,
			}

		});
		return await modal.present();
	}


}
