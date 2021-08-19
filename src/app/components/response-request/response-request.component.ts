import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { combineLatest, merge, Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { RequestsService } from 'src/app/services/requests.service';
import { PopOverComponent } from '../pop-over/pop-over.component';

@Component({
	selector: 'app-response-request',
	templateUrl: './response-request.component.html',
	styleUrls: ['./response-request.component.scss'],
})
export class ResponseRequestComponent implements OnInit, AfterViewInit {

	@Input() requete: any;
	@Input() user: any;
	responses: Observable<any[]>;
	@ViewChildren('likes') likes: any;
	@ViewChildren('dislikes') dislikes: any;
	bestRep: any;

	constructor(public modalController: ModalController,
		public reqService: RequestsService,
		public afs: AngularFirestore,
		public elem: ElementRef,
		public popoverController: PopoverController,
		public chatService: ChatService) { }

	ngOnInit() {
		this.responses = this.reqService.getRequestResponses(this.requete.uid);
	}

	ngAfterViewInit() {
		combineLatest([
			this.likes.changes,
			this.dislikes.changes,
			this.responses
		]).pipe(
			tap(([like, dislike, resp]) => {
				this.controle(resp)
			})
		).subscribe();
	}

	controle(response) {
		response.map((r, index) => {
			const lik = r.like.findIndex(u => u == this.user.uid);
			const dislik = r.dislike.findIndex(u => u == this.user.uid);
			if (lik != -1) {
				this.likes._results[index].nativeElement.firstChild.style.fill = "#00BA29";
			} else if (dislik != -1) {
				this.dislikes._results[index].nativeElement.firstChild.style.fill = "#00BA29";
			}
		})
	}




	dismiss() {
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	sendMsg(event) {

		const id = this.afs.createId();
		const note = {
			nombre: 0,
			usersId: []
		}
		const newMsg = {
			uid: id,
			message: event,
			timestamp: new Date(),
			userDisplayName: this.user.displayName,
			senderUid: this.user.uid,
			like: [],
			dislike: [],

		}

		console.log(newMsg);
		this.reqService.sendResponse(newMsg, this.requete.uid);
	}

	like(msg) {
		console.log(msg);
		const deter = msg.like.findIndex(u => u == this.user.uid);
		const inc = msg.dislike.findIndex(u => u == this.user.uid);
		if (inc != -1) msg.dislike.splice(inc, 1);
		deter != -1 ? msg.like.splice(deter, 1) : msg.like.push(this.user.uid);
		this.reqService.updateResponse(msg, this.requete.uid);
	}

	dislike(msg) {
		console.log(msg);
		const deter = msg.dislike.findIndex(u => u == this.user.uid);
		const inc = msg.like.findIndex(u => u == this.user.uid);
		if (inc != -1) msg.like.splice(inc, 1);
		deter != -1 ? msg.dislike.splice(deter, 1) : msg.dislike.push(this.user.uid);
		this.reqService.updateResponse(msg, this.requete.uid);
	}


	async presentPopover(ev, rep) {
		console.log(rep);
		const contact = {
			name: rep.userDisplayName,
			uid: rep.senderUid,
		}
		if (rep.senderUid != this.user.uid) {
			const popover = await this.popoverController.create({
				component: PopOverComponent,
				// showBackdrop : false,
				cssClass: 'popUpCustom',
				event: ev,
				componentProps: {
					'contact': contact,
					'user': this.user
				}
			});
			await popover.present();

			const { role } = await popover.onDidDismiss();
			console.log('onDidDismiss resolved with role', role);

		}
	}



}
