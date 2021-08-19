import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserServiceService } from './services/user-service.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {

	user: Observable<any>;

	constructor(private userService: UserServiceService,
		private auth: AngularFireAuth,
		public afs: AngularFirestore) { }
}
