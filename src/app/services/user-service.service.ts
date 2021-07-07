import { NavController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { map, share, switchMap, tap } from 'rxjs/operators';
import '@codetrix-studio/capacitor-google-auth'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

GoogleAuth.init();

@Injectable({
	providedIn: 'root'
})
export class UserServiceService {
	authState = new BehaviorSubject(false);

	user: Observable<any>;
	userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
	messageSub: BehaviorSubject<any> = new BehaviorSubject(null);


	constructor(
		private googlePlus: GooglePlus,
		private afs: AngularFirestore,
		public auth: AngularFireAuth,
		public navCtl: NavController,
		// private storage: Storage,
		private platform: Platform,
		private firebaseAuthentication: FirebaseAuthentication
	) { }

	getUser(user) {
		console.log(user);
		this.userSubject.next(user);
		this.user = this.userSubject
			.pipe(
				switchMap(r => this.afs.collection('users').doc(r).valueChanges()),
				tap(r => console.log(r)),
				share()
			)

		return this.user;
	}

	logUserWithGoogle() {
		let goog = from(this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
		let userGoogle;
		this.user = goog.pipe(
			tap(r => userGoogle = r.user),
			switchMap(r => this.afs.collection('users').doc(r.user.uid).valueChanges()),
			map((r: any) => r ? this.userSubject.next(r.uid) : this.userSubject.next(this.createUser(r)))
		)
		this.user.subscribe();

	}

	signout() {
		this.auth.signOut();
		this.googlePlus.logout();
	}


	connectGoogle() {
		if (this.platform.is('android')) {
			this.googleSignIn();
		} else {
			this.logUserWithGoogle();
		}
	}

	createUser(user) {
		const newUser = {
			name: user.displayName,
			mail: user.email,
			uid: user.uid
		}
		this.afs.collection('users').doc(user.uid).set(Object.assign({}, newUser));
		return newUser;
	}


	isAuthenticated() {
		return this.authState;
	}

	updateUser(user) {
		console.log(user);
		this.afs.collection('users').doc(user.uid).update(Object.assign({}, user));
	}


	async googleSignIn() {
		try {
			const gplUser = await this.googlePlus.login({
				'webClientId': '84932470385-pd9pgtetadfar56b667ggfprofeslf4b.apps.googleusercontent.com'
			})

			await this.auth.signInWithCredential(
				firebase.auth.GoogleAuthProvider.credential(gplUser.idToken)
			)

			await firebase.auth().onAuthStateChanged((user) => {
				if (user) {
					const userObser = this.afs.collection('users').doc(user.uid).valueChanges();
					userObser.subscribe(r => {
						if (!r) {
							const us = {
								displayName: user.displayName,
								uid: user.uid,
								email: user.email,
								photo: user.photoURL
							}
							this.afs.collection('users').doc(user.uid).set(Object.assign({}, us));
						}
					})
				}
			})

		} catch (err) {
			console.log(err)
		}

	}




}
