import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ModalController, NavController } from '@ionic/angular';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingComponent } from '../components/loading/loading.component';
import { LoginPopUpComponent } from '../components/login-pop-up/login-pop-up.component';
import { UserServiceService } from '../services/user-service.service';
@Component({
	selector: 'app-preferences',
	templateUrl: './preferences.page.html',
	styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {

	isEditable = false;
	@ViewChildren('slide') slide: QueryList<any>;
	slideOpts = {
		slidesPerView: 3,
		spaceBetween: 20,
		// navigation : true,
	};

	message: any[] = [
		'Pour commencer, parlez-nous de vos centres d’intérêts pendant vos voyages.',
		'Et maintenant, parlez-nous des pays que vous avez déjà visité.',
		'Ensuite, parlez-nous de votre prochaine destination, ou bien d’un projet de voyage.',
		'Et enfin, connaissez-vous vos dates de départ ?'
	];

	paySelect: any[] = [
		{
			nom: 'Maroc',
			image: '../../assets/svg-country-flags/svg/ma.svg'
		},
		{
			nom: 'Tanzanie',
			image: '../../assets/svg-country-flags/svg/tz.svg'
		},
		{
			nom: 'Egypte',
			image: '../../assets/svg-country-flags/svg/eg.svg'
		},
		{
			nom: 'Emirats',
			image: '../../assets/svg-country-flags/svg/ae.svg'
		}
	]

	items = [];
	user: any;
	prefTable: any[] = [];

	constructor(public uService: UserServiceService,
		private navCtl: NavController,
		public modalController: ModalController,
		private auth: AngularFireAuth) {
	}

	ngOnInit() {
		const dat = from(this.uService.getMobileUserFromStorage());
		dat.pipe(
			tap(user => {
				this.user = JSON.parse(user);
			})
		).subscribe();
		console.log(this.user)

	}

	logout() {
		console.log('out');
		this.uService.signout();
	}


	addItem(newItem: string) {
		console.log(newItem)
		this.items.push(newItem);
		console.log(this.items)
	}

	deleteItem(item) {
		this.items.splice(item, 1);
		console.log(this.items);
	}

	preferencesAction(event) {
		this.prefTable = event;
		console.log(this.prefTable);
	}

	sendTags(user) {
		console.log(user, this.prefTable);
		let cata = { ...user, preferences: this.prefTable };
		this.uService.updateUser(cata);
	}


	async presentModal() {
		const modal = await this.modalController.create({
			component: LoadingComponent,
		});
		return await modal.present();
	}

	login() {
		this.uService.connectGoogle();
	}

	send(user) {
		let cata = { ...user, paysVoyages: this.items };
		console.log(cata);
		this.uService.updateUser(cata);

	}


	async loginMail() {
		const modal = await this.modalController.create({
			component: LoginPopUpComponent,
			cssClass: 'modalDescription'
		});
		return await modal.present();
	}

}
