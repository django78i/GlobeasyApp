import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoComponent } from '../photo/photo.component';

@Component({
	selector: 'app-description-pop-up',
	templateUrl: './description-pop-up.component.html',
	styleUrls: ['./description-pop-up.component.scss'],
})
export class DescriptionPopUpComponent implements OnInit {
	place: any;
	slideOpts = {
		// initialSlide: 0,
		slidesPerView: 1,
		// spaceBetween: 5,
		speed: 200,
	};
	latitude: number = 25.276987;
	longitude: number = 55.296249;
	zoom = "zoom";

	@Input() placeDescription: any;


	constructor(public modalController: ModalController) {

	}

	ngOnInit() {
		console.log(this.placeDescription);
		const add = this.placeDescription.adresse.split('-').splice(0, 2).join('-');
		this.place = { ...this.placeDescription, iconUrl: '../../assets/icon/globMap.svg', adresse: add };
		console.log(this.place);
		this.latitude = this.place.location.lat;
		this.longitude = this.place.location.lng;

	}

	dismiss() {
		this.modalController.dismiss({
			'dismissed': true
		});
	}

	async presentModal(image) {
		const modal = await this.modalController.create({
			component: PhotoComponent,
			// cssClass: 'modalDescription',
			componentProps: {
				'place': image
			}
		});
		return await modal.present();
	}


}
