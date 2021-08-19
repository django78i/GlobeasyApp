import { NavController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { first, map, share, switchMap, tap } from 'rxjs/operators';
import '@codetrix-studio/capacitor-google-auth'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage-angular';

GoogleAuth.init();

@Injectable({
	providedIn: 'root'
})
export class UserServiceService {
	authState = new BehaviorSubject(false);

	user: Observable<any>;
	userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
	messageSub: BehaviorSubject<any> = new BehaviorSubject(null);
	errorMessage: Subject<string> = new Subject;
	userStorage: any;
	private _storage: Storage | null = null;

	constructor(
		private googlePlus: GooglePlus,
		private afs: AngularFirestore,
		public auth: AngularFireAuth,
		public navCtl: NavController,
		private nativeStorage: NativeStorage,
		public platform: Platform,
		private storage: Storage
	) {

		this.init();
		this.auth.onAuthStateChanged((user) => {
			if (user != null) {
				this.afs.collection('users').doc(user.uid).valueChanges()
					.pipe(
						first(),
						// share(),
						tap(r => {
							if (user != null) {
								console.log('iciGars');
								// this.getMobileUserFromStorage()
								this.saveUserStorage(r);
							} else {
								console.log("ya rien");
							}
						})
					).subscribe();
			}
		})

	}


	init() {
		this.storage.create()
	}

	deleteUserStorage() {
		return this.storage.clear().then(() => console.log('finish'));
	}



	saveUserStorage(user) {
		console.log(user);
		return this.storage.set('user', JSON.stringify(user)).then((u) => console.log(u));
	}


	getUser(user) {
		this.userSubject.next(user);
		this.user = this.userSubject
			.pipe(
				switchMap(r => this.afs.collection('users').doc(r).valueChanges()),
				tap(r => console.log(r)),
				share()
			)

		return this.user;
	}

	getMobileUserFromStorage() {
		return this.storage.get('user');
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
		this.deleteUserStorage();
		this.auth.signOut();
		if (this.platform.is('android')) {
			console.log('android');
			this.googlePlus.logout();
		}
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


	logMail(mail, password) {
		return this.auth.signInWithEmailAndPassword(mail, password);
	}

	createUserMailPassword(mail, password, pseudo) {
		return this.auth.createUserWithEmailAndPassword(mail, password)
			.then((user) => {
				const newUser = {
					displayName: pseudo,
					mail: mail,
					dateCreation: new Date(),
					uid: user.user.uid,
					password: password
				}
				this.afs.collection('users').doc(newUser.uid).set(Object.assign({}, newUser));
			})
			.catch((error) => {
				var errorMessage = error.message;
				this.errorMessage.next(errorMessage);
				console.log(errorMessage)
			});

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
