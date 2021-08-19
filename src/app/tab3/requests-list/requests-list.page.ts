import { IonSlide, ModalController, NavController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ResponseRequestComponent } from 'src/app/components/response-request/response-request.component';
import { CreateRequestPopComponent } from 'src/app/components/create-request-pop/create-request-pop.component';
import { BehaviorSubject, combineLatest, iif, Observable, Subscription } from 'rxjs';
import { RequestsService } from 'src/app/services/requests.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

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
export class RequestsListPage implements OnInit, AfterViewInit, OnDestroy {

	@ViewChildren('fiche') fiche: QueryList<any>;

	sub: Subscription;
	requests: Observable<any[]>;
	reqSub: Subscription;
	requetTable: any[] = [];
	user: any;
	authSub: Subscription;
	reqSubject$: BehaviorSubject<any> = new BehaviorSubject(null);

	constructor(public navCtl: NavController,
		private modalController: ModalController,
		public reqSer: RequestsService,
		public uservice: UserServiceService,
		public auth: AngularFireAuth) { }

	async ngOnInit() {
		const dat = await this.uservice.getMobileUserFromStorage()
		this.user = JSON.parse(dat);
		this.requests = this.reqSer.getRequest(this.user.uid)
			.pipe(tap(r => this.requetTable = r));
	}

	ngAfterViewInit() {
		this.mapZone()
		this.sub = this.fiche.changes.subscribe(r => {
			this.mapZone()
		})
	}

	navigate() {
		this.navCtl.navigateForward('tabs/tab3/request-respons');
	}

	pop(event, uid) {
		console.log(uid)
		this.reqSer.aband(this.requetTable[event], uid.uid)
		this.requetTable.splice(event, 1);
	}

	mapZone() {
		this.fiche.map((r, i) => {
			if (r == 0) {
				r.nativeElement.style.boxShadow = '0px 15px 25px 5px rgb(0 0 0 / 17%)';
			}
			r.nativeElement.style.zIndex = `calc(5 - ${i})`;
			r.nativeElement.style.transform = `translate3d(0%,calc(8% * ${i}) ,calc(200px * ${i})) scale(calc((10 - ${i}) / 10))`;
		})
	}

	async presentModal(event, user) {
		const modal = await this.modalController.create({
			component: ResponseRequestComponent,
			cssClass: 'modalDescription',
			componentProps: {
				'requete': event,
				'user': user
			}
		});
		return await modal.present();
	}

	async createRequest(user) {
		const modal = await this.modalController.create({
			component: CreateRequestPopComponent,
			componentProps: {
				'user': user
			}
		});
		return await modal.present();
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}


}
