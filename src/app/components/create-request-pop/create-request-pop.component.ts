import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestsService } from 'src/app/services/requests.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
	selector: 'app-create-request-pop',
	templateUrl: './create-request-pop.component.html',
	styleUrls: ['./create-request-pop.component.scss'],
})
export class CreateRequestPopComponent implements OnInit, AfterViewInit {

	sujet = [
		'Départ',
		'COVID',
		'Shopping',
		'Gastronomie',
		'Autre'
	]

	slideOpts = {};


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
	];
	contenu: any = '';
	tags = [];
	pays: any = '';
	@ViewChild('slide', { static: true }) slide: IonSlides;
	// user: Observable<any>;
	@Input() user: any;
	constructor(public modalController: ModalController,
		private userService: UserServiceService,
		public requestServ: RequestsService,
		public toastController: ToastController) { }

	ngOnInit() {
		// this.user = this.userService.user;
	}

	ngAfterViewInit() {
		this.slideOpts = {
			slidesPerView: 3.1,
		}
		this.slide.lockSwipes(true);

	}

	dismiss() {
		this.modalController.dismiss({
			'dismissed': true
		});
	}


	next() {
		console.log(this.slide);
		this.slide.lockSwipes(false);
		this.slide.slideNext();
		this.slide.lockSwipes(true);
	}
	previous() {
		console.log(this.slide);
		this.slide.lockSwipes(false);
		this.slide.slidePrev();
		this.slide.lockSwipes(true);
	}


	choose(i) {
		this.tags.push(this.sujet[i]);
		console.log(this.tags)
	}


	async presentToast() {
		const toast = await this.toastController.create({
			position: 'top',
			message: 'Votre requête a été envoyée.',
			duration: 2000
		});
		toast.present();
	}

	sendReq() {
		// this.userService.user.pipe(
		// tap(r => {
		const us = {
			createur: this.user.displayName,
			date: new Date(),
			detail: this.contenu,
			tags: this.tags,
			pays: this.pays,
			userUid: this.user.uid
		}
		this.requestServ.sendRequest(us);
		// })
		// ).subscribe();
		this.dismiss();
		this.presentToast();
	}
}
