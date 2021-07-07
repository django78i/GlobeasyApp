import { AgmMap } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PopPartnerComponent } from 'src/app/components/pop-partner/pop-partner.component';
import { PhotoComponent } from '../../components/photo/photo.component'

@Component({
	selector: 'app-place-description',
	templateUrl: './place-description.page.html',
	styleUrls: ['./place-description.page.scss'],
})
export class PlaceDescriptionPage implements OnInit {

	place: any;
	slideOpts = {
		initialSlide: 0,
		slidesPerView: 3,
		spaceBetween: 5,
		speed: 200,
	};
	latitude: number = 25.276987;
	longitude: number = 55.296249;
	zoom = "zoom";
	tablTemplate: any[] = [{
		nb: '1'
	},
	{
		nb: '2'
	},
	{
		nb: '3'
	},
	];


	constructor(public navCtl: NavController, private route: ActivatedRoute, public modalController: ModalController) {
		console.log(history.state.data);
		const add = history.state.data.g.adresse.split('-').splice(0, 2).join('-');
		this.place = { ...history.state.data.g, iconUrl: '../../../assets/icon/globMap.svg', adresse: add };
		this.latitude = this.place.location.lat;
		this.longitude = this.place.location.lng;

	}

	ngOnInit() {

	}

	back() {
		this.navCtl.back();
	}

	async presentModal(image) {
		const modal = await this.modalController.create({
			component: PhotoComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'place': image
			}
		});
		return await modal.present();
	}


	async openPartner(user) {
		console.log(user);
		const modal = await this.modalController.create({
			component: PopPartnerComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'partner': user
			}

		});
		return await modal.present();
	}


}
