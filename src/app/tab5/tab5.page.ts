import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AnimationController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { myFadeInAnimation } from '../animations/animation-test';
import { ModalTestComponent } from '../components/modal-test/modal-test.component';
import { UserServiceService } from '../services/user-service.service';

@Component({
	selector: 'app-tab5',
	templateUrl: './tab5.page.html',
	styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

	user: any;
	public cards = new Array(10);
	slideOpts = {
		slidesPerView: 1.2,
		spaceBetween: 20,
		// navigation : true,
	};

	@ViewChildren('miniature') miniature: any;

	constructor(private userService: UserServiceService, private auth: AngularFireAuth, private modalController: ModalController, public animationCtrl: AnimationController) { }

	ngOnInit() {
		// this.user = this.userService.getUserFromStorage();
		this.userService.getMobileUserFromStorage().then(user=> this.user = JSON.parse(user))

	}


	async launchDetail(ev, index, slideNum) {
		console.log(ev);
		console.log(ev.target.getBoundingClientRect());
		const yPos = ev.target.getBoundingClientRect().y;
		const enterAnimation = (baseEl: any) => {
			const backdropAnimation = this.animationCtrl.create()
				.addElement(baseEl.querySelector('ion-backdrop'))
				.fromTo('opacity', '0', '0');


			const wrapperAnimation = this.animationCtrl.create()
				.addElement(baseEl.querySelector('.modal-wrapper'))
				.easing('cubic-bezier(0.36,0.66,0.04,1)')
				.beforeStyles({ 'opacity': 0, 'transform': 'scale(0)' })
				.fromTo('translateX', '0%', '0%')
				.keyframes([
					{ offset: 0, opacity: '0', transform: 'scale(1)' },
					{ offset: 1, opacity: '1', transform: 'scale(1)' }
				]);

			const slide = slideNum == "slide1" ? document.querySelectorAll('.slide1') : document.querySelectorAll('.slide2');
			const miniature = this.animationCtrl.create()
				.addElement(slide[index])
				.easing('linear')
				.keyframes([
					{ offset: 0, opacity: '1' },
					{ offset: 0.5, opacity: '0' },
					{ offset: 1, opacity: '0' }
				])
				.duration(450);


			return this.animationCtrl.create()
				.addElement(baseEl)
				// .easing('linear')
				.duration(2000)
				.beforeAddClass('show-modal')
				.addAnimation([
					backdropAnimation,
					wrapperAnimation,
					miniature
				])
		}


		const leaveAnimation = (baseEl: any) => {
			return enterAnimation(baseEl).direction('reverse');
		}

		const modal = await this.modalController.create({
			component: ModalTestComponent,
			enterAnimation,
			leaveAnimation,
			cssClass: 'testModal',
			componentProps: {
				'coords': {
					x: '12',
					y: yPos,
					width: ev.target.clientWidth,
					height: ev.target.clientHeight
				}
			}
		});
		return await modal.present();


	}


}
