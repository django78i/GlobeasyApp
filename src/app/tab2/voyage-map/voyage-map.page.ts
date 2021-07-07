import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DescriptionPopUpComponent } from 'src/app/components/description-pop-up/description-pop-up.component';
import { PlacesService } from 'src/app/services/places.service';

@Component({
	selector: 'app-voyage-map',
	templateUrl: './voyage-map.page.html',
	styleUrls: ['./voyage-map.page.scss'],
})
export class VoyageMapPage implements OnInit {
	places: Observable<any[]>;
	latitude: number = 25.276987;
	longitude: number = 55.296249;
	@ViewChildren('list') list: QueryList<any>;
	rating3 = 3;
	slideOpts = {
		slidesPerView: 1.1,
		spaceBetween: 10,
		// navigation : true,
	};

	@ViewChild('slides', { static: true }) slides: IonSlides;

	constructor(public pls: PlacesService, public elmRef: ElementRef, public navCtl: NavController, public modalController : ModalController) { }

	ngOnInit() {
		this.getPlaces();
	}



	getPlaces() {
		this.places = this.pls.getPlaces().pipe(
			map(r => {
				let dat = r.map((v: any) => {
					const ad = v.adresse.split('-').splice(0, 2).join('-');
					switch (v.type) {
						case 'Gastronomie':
							return { ...v, iconUrl: '../../../assets/icon/food.svg', addFormat: ad };
							break;
						case 'Clubs/Lounges':
							return { ...v, iconUrl: '../../../assets/icon/activite.svg', addFormat: ad };
							break;
						case 'Shopping':
							return { ...v, iconUrl: '../../../assets/icon/shopping.svg', addFormat: ad };
							break;
						case 'Culture':
							return { ...v, iconUrl: '../../../assets/icon/culture.svg', addFormat: ad };
							break;
					}
				})
				// console.log(dat);
				return dat;
			}),
		)
	}

	getIcon(l) {
		console.log(l);
		l.map(r => console.log(r))
	}

	navigate(g) {
		this.navCtl.navigateForward('tabs/tab2/place-description', { state: { data: { g } } });
	}

	getSlider(i) {
		console.log('ici', i);
		this.slides.slideTo(i);
	}


	async openDescription(place) {
		console.log(place);
		const modal = await this.modalController.create({
			component: DescriptionPopUpComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'placeDescription': place
			}

		});
		return await modal.present();
	}


}
