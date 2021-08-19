import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserServiceService } from '../services/user-service.service';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

	user: any;
	store: any;
	constructor(
		public auth: AngularFireAuth,
		public us: UserServiceService,
	) {

	}

	async ngOnInit() {
		const dat = await this.us.getMobileUserFromStorage();
		this.user = JSON.parse(dat);
		console.log(this.user);
	}


	logout() {
		console.log('out');
		this.us.signout();
	}

}
