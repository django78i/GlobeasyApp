import { Component, OnInit, Output, QueryList, ViewChildren, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-accordeon',
	templateUrl: './accordeon.component.html',
	styleUrls: ['./accordeon.component.scss'],
})
export class AccordeonComponent implements OnInit {

	slideOpts = {
		slidesPerView: 3,
		spaceBetween: 20,
		// navigation : true,
	};

	foodTable: any = {
		nom: 'gastronomie',
		content: [
			'FoodCourt',
			'StreetFood', 'Restaurant 5 étoiles', 'Boui-Boui',
			'Thaïlandais', 'Fast-Food', 'cuisine Asiatique', 'Spécialité Africaine',
			'cuisine du monde', 'cuisine italienne', 'Japonais', 'Cuisine indienne',
			'Végétarien', 'Halal', 'Petit-déjeuner et Brunch',
			'buffet', 'Pâtisserie', 'spécialité turc', 'cuisine libanaise'
		]
	};

	tripTable: any = {
		nom: 'voyage',
		content: [
			'montagne',
			'plage et soleil',
			'road-trip',
			'randonnée',
			'croisière'
		]
	};

	cultureTable: any = {
		nom: 'culture',
		content: [
			'Musée',
			'Concerts',
			'Monuments',
			'Street-Art',
			'sites historiques'
		]
	};


	activityTable: any = {
		nom: 'activité',
		content: [
			'Bien-être', ' Sport aquatique',
			'En famille',
			' Sports extrêmes',
			' Parc à thème',
			'Plongée',
			'parc d’attraction',
			' excursions diverses',
			'théatre'
		]
	}


	shoppingTable: any = {
		nom: 'shopping',
		content: [
			'Boutique de souvenirs',
			'Marchés/souks',
			'Centre commerciale',
			'Boutique de luxe'
		]
	}

	pref: any[] = [];

	step = 0;
	@ViewChildren('voyage') voyage: QueryList<any>;
	@ViewChildren('gastronomie') gastronomie: QueryList<any>;
	@ViewChildren('culture') culture: QueryList<any>;
	@ViewChildren('activite') activite: QueryList<any>;
	@ViewChildren('shopping') shopping: QueryList<any>;
	@Output() preferences: EventEmitter<any[]> = new EventEmitter;

	constructor() { }

	ngOnInit() { }

	setStep(index: number) {
		this.step = index;
	}

	nextStep() {
		this.step++;
	}

	prevStep() {
		this.step--;
	}

	activity(tag, i) {
		const dat = this.pref.findIndex(r => r == tag);
		dat == -1 ? this.pref.push(tag) : this.pref.splice(dat, 1);
		this.preferences.emit(this.pref);
		this.activite.map((r, index) => {
			if (index == i) {
				r.nativeElement.classList.contains('bordure') ? r.nativeElement.classList.remove('bordure') : r.nativeElement.classList.add('bordure')
			}
		}
		)
	}

	cultures(tag, i) {
		const dat = this.pref.findIndex(r => r == tag);
		dat == -1 ? this.pref.push(tag) : this.pref.splice(dat, 1);
		this.preferences.emit(this.pref);
		this.culture.map((r, index) => {
			if (index == i) {
				r.nativeElement.classList.contains('bordure') ? r.nativeElement.classList.remove('bordure') : r.nativeElement.classList.add('bordure')
			}
		}
		)
	}

	shop(tag, i) {
		const dat = this.pref.findIndex(r => r == tag);
		dat == -1 ? this.pref.push(tag) : this.pref.splice(dat, 1);
		this.preferences.emit(this.pref);
		this.shopping.map((r, index) => {
			if (index == i) {
				r.nativeElement.classList.contains('bordure') ? r.nativeElement.classList.remove('bordure') : r.nativeElement.classList.add('bordure')
			}
		}
		)
	}

	gastronomy(tag, i) {
		const dat = this.pref.findIndex(r => r == tag);
		dat == -1 ? this.pref.push(tag) : this.pref.splice(dat, 1);
		this.preferences.emit(this.pref);
		this.gastronomie.map((r, index) => {
			if (index == i) {
				r.nativeElement.classList.contains('bordure') ? r.nativeElement.classList.remove('bordure') : r.nativeElement.classList.add('bordure')
			}
		}
		)
	}

	trip(tag, i) {
		const dat = this.pref.findIndex(r => r == tag);
		dat == -1 ? this.pref.push(tag) : this.pref.splice(dat, 1);
		this.preferences.emit(this.pref);
		this.voyage.map((r, index) => {
			if (index == i) {
				r.nativeElement.classList.contains('bordure') ? r.nativeElement.classList.remove('bordure') : r.nativeElement.classList.add('bordure')
			}
		}
		)

	}

}
