import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, takeLast, tap } from 'rxjs/operators';
import { DescriptionPopUpComponent } from 'src/app/components/description-pop-up/description-pop-up.component';
import { PlacesService } from 'src/app/services/places.service';

@Component({
	selector: 'app-voyage-display',
	templateUrl: './voyage-display.page.html',
	styleUrls: ['./voyage-display.page.scss'],
})
export class VoyageDisplayPage implements OnInit, OnDestroy {

	places: Observable<any[]>;
	cultureTab: any[] = [];
	activiteTab: any[] = [];
	gastronomieTab: any[] = [];
	shoppingTab: any[] = [];

	slideOpts = {
		slidesPerView: 1.2,
		spaceBetween: 20,
		// navigation : true,
	};

	tablTemplate: any[] = [{
		nb: '1'
	},
	{
		nb: '2'
	}
	];

	slidesPerView: any;
	spaceBetween: any;

	@ViewChildren('voyage') voyage: QueryList<any>;
	@ViewChildren('gastronomie') gastronomie: QueryList<any>;
	@ViewChildren('culture') culture: QueryList<any>;
	@ViewChildren('activite') activite: QueryList<any>;
	@ViewChildren('shopping') shopping: QueryList<any>;

	rating3: number;
	rating2: number;
	starRating = 3;
	selectPlace: Subject<any> = new Subject;
	palace: any;
	sub: Subscription;

	constructor(public pls: PlacesService, public navCtl: NavController, public modalController: ModalController) {
		this.rating3 = 3, 2;
		this.rating2 = 0;
	}

	ngOnInit() {
		this.getPlaces();
	}

	getPlaces() {
		this.places = this.pls.getPlaces().pipe(
			distinctUntilChanged(),
			tap(r => this.filterPlace(r))
		);
		this.sub = this.places.subscribe(
			r => this.palace = r
		)
	}

	navigate(event) {
		console.log(event);
		const g = event;
		this.navCtl.navigateForward('tabs/tab2/place-description', { state: { data: { g } } });
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


	filterPlace(places) {
		places.map(place => {
			let comp: any;
			place = { ...place, note: 3.5 }
			switch (place.type) {
				case 'Gastronomie':
					comp = this.gastronomieTab.find(r => r.uid == place.uid);
					// console.log(comp);
					if (!comp) this.gastronomieTab.push(place);
					break;
				case 'Clubs/Lounges':
					if (this.activiteTab.length) comp = this.activiteTab.find(r => r.uid == place.uid);
					if (!comp) this.activiteTab.push(place);
					// this.activiteTab.push(place);
					break;
				case 'Shopping':
					comp = this.shoppingTab.find(r => r.uid == place.uid);
					if (!comp) this.shoppingTab.push(place);
					// this.shoppingTab.push(place);
					break;
				case 'Culture':
					console.log(this.cultureTab)
					comp = this.cultureTab.find(r => r.uid == place.uid);
					console.log(comp)
					if (!comp) this.cultureTab.push(place);
					// this.cultureTab.push(place);
					// console.log(this.cultureTab);
					break;
			}

		})
		console.log(this.activiteTab);
		return places;
	}


	showPlace(event) {
		console.log(event);
		event.length ? this.selectPlace.next(event) : this.selectPlace.next(undefined);
		if (!event.length) {
			this.getPlaces();
		}
	}



	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
