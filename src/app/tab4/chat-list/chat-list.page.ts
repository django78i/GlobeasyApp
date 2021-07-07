import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
	selector: 'app-chat-list',
	templateUrl: './chat-list.page.html',
	styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

	rooms = [
		{
			name: "Muriel Mumu",
			lastMsg: "Salut, j’ai vu que tu as déjà visit..."
		},
		{
			name: "Zak Naan",
			lastMsg: "Yo, envoi ton num au pire, ce se..."
		},
		{
			name: "Ano Pliz",
			lastMsg: "Salut, j’ai vu que tu as déjà visit..."
		},
		{
			name: "Jude End",
			lastMsg: "Salut, j’ai vu que tu as déjà visit..."
		}
	]


	roomsSub: BehaviorSubject<any[]> = new BehaviorSubject(null);
	roomsObs$: Observable<any[]>;
	custom: any;

	constructor(public navCtl: NavController) { }

	ngOnInit() {
	}


	change(event) {
		this.roomsObs$ = this.roomsSub.pipe(
			map(r => event.detail.value == "" ? this.rooms : r.filter(r => r.name.toLowerCase().includes(event.detail.value.toLowerCase()))),
			tap(dat => console.log(dat))
		)
		console.log(event.detail.value);
	}

	navigate(room) {
		console.log("la");
		this.navCtl.navigateForward('tabs/tab4/chat-conv', { state: { data: { room } } });
	}

}
