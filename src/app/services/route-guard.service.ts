import { first, share, tap } from 'rxjs/operators';
import { NavController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
@Injectable({
	providedIn: 'root'
})
export class RouteGuardService {

	constructor(
		private router: Router,
		private auth: AngularFireAuth,
		public navCtrl: NavController,
		public us: UserServiceService,
		public afs: AngularFirestore,
	) { }

	canActivate(route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,): boolean | Observable<boolean> | Promise<boolean> {
		console.log('ici');
		return new Promise((resolve, reject) => {
			this.auth.authState.pipe(
				tap(user => {
					console.log(user);
					if (user) {
						// this.afs.collection('users').doc(user.uid).valueChanges()
						// 	.pipe(
						// 		first(),
						// 		// share(),
						// 		tap(r => {
						// 			if (user != null) {
						// 				console.log('iciGars');
						// 				// this.getMobileUserFromStorage()
						// 				this.us.saveUserStorage(r);
						// 			} else {
						// 				console.log("ya rien");
						// 			}
						// 		})
						// 	).subscribe();
						resolve(true);
					} else {
						console.log('User is not logged in');
						this.us.deleteUserStorage()
						this.router.navigate(['preferences']);
						resolve(false);
					}
				})
			).subscribe()
		});
	}

	// async init() {
	// 	await this.nativeStorage.create();
	// }


}
