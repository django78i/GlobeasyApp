import { ModalController, NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { PlacesService } from '../services/places.service';
import { Observable } from 'rxjs';
import { PreferencesModalComponent } from '../components/preferences-modal/preferences-modal.component';
import { UserServiceService } from '../services/user-service.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';



@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	places: Observable<any[]>;
	user: Observable<any>;

	constructor(public navCtl: NavController,
		public pls: PlacesService,
		public modalController: ModalController,
		public userService: UserServiceService,
		public auth: AngularFireAuth) {
		this.places = this.pls.getPlaces();

		// this.auth.onAuthStateChanged(r => {
		// 	if (r) {
		// 		console.log(r);
		// 		this.user = this.userService.getUser(r.uid);
		// 	}
		// })
		// this.user = this.userService.getUser('F4w65spWojZ3pYGmWzQu74crDCo2').pipe(tap(r => console.log(r)))
	}

	navgigateMap(map) {
		this.navCtl.navigateForward('tabs/tab2/voyage-map', { state: { data: { map } } });

	}
	navgigateDisplay(map) {
		this.navCtl.navigateForward('tabs/tab2/voyage-display', { state: { data: { map } } });

	}

	async openEdit(user) {
		console.log(user);
		const modal = await this.modalController.create({
			component: PreferencesModalComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'user': user
			}

		});
		return await modal.present();
	}


}
