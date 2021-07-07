import { IonSlide, ModalController, NavController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ResponseRequestComponent } from 'src/app/components/response-request/response-request.component';

@Component({
	selector: 'app-requests-list',
	templateUrl: './requests-list.page.html',
	styleUrls: ['./requests-list.page.scss'],
	animations: [
		trigger('out', [
			transition(':leave', [
				animate('500ms ease', style({ transform: 'translateX(500px)' }))
			])
		])
	]
})
export class RequestsListPage implements OnInit, AfterViewInit {

	@ViewChildren('fiche') fiche: QueryList<any>;


	requetes: any[] = [
		{
			createur: 'Mumu1',
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori',
			tags: ['Émirats arabes unis'],
			indice: 0
		},
		{
			createur: 'Mumu2',
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori',
			tags: ['Émirats arabes unis'],
			indice: 1
		},
		{
			createur: 'Mumu3',
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori',
			tags: ['Émirats arabes unis'],
			indice: 2
		},
		{
			createur: 'Mumu4',
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori',
			tags: ['Émirats arabes unis'],
			indice: 3
		},
		{
			createur: 'Mumu5',
			detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori',
			tags: ['Émirats arabes unis'],
			indice: 4
		},
	];

	slideOpts = {
		slidesPerView: 1,
		spaceBetween: 20,
		// navigation : true,
	};


	constructor(public navCtl: NavController, private modalController: ModalController) { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		this.mapZone()
		this.fiche.changes.subscribe(r => {
			this.mapZone()
		})
	}

	navigate() {
		this.navCtl.navigateForward('tabs/tab3/request-respons');
	}

	pop(event) {
		this.requetes.splice(event, 1);
	}

	mapZone() {
		this.fiche.map((r, i) => {
			console.log(r)
			console.log(i)
			if (r == 0) {
				r.nativeElement.style.boxShadow = '0px 15px 25px 5px rgb(0 0 0 / 17%)';
			}
			// r.nativeElement.style.opacity = i == 0 ? 1 : i == 1 ? 0.5 : 1 / i
			r.nativeElement.style.zIndex = `calc(5 - ${i})`;
			r.nativeElement.style.transform = `translate3d(0%,calc(8% * ${i}) ,calc(200px * ${i})) scale(calc((10 - ${i}) / 10))`;
		})
	}

	async presentModal(event) {
		const modal = await this.modalController.create({
			component: ResponseRequestComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'requete': event
			}
		});
		return await modal.present();
	}


}
