import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, share, tap } from 'rxjs/operators';
import * as _ from "lodash";


@Injectable({
	providedIn: 'root'
})
export class RequestsService {

	requestSub: Subject<any[]> = new Subject;
	request$: Observable<any[]>;

	constructor(public afs: AngularFirestore) { }

	sendRequest(req) {
		const id = this.afs.createId();
		req = { ...req, uid: id }
		console.log(req);
		this.afs.collection('requetes').doc(id).set(Object.assign({}, req))
	}


	getRequest(uid): Observable<any[]> {
		console.log(uid)
		const req = this.afs.collection('requetes').valueChanges();
		const reqAbandonnees = this.afs.collection('users').doc(uid).collection('requetes').valueChanges();

		const selection = combineLatest([
			req,
			reqAbandonnees
		])
			.pipe(
				tap(([v, va]) => console.log(v, va)),
				map(([r, ra]) => {
					let prev = [];
					r.map((v: any) => {
						var sortTable = ra.find(z => z.uid == v.uid);
						console.log(sortTable);
						if (!sortTable) prev.push(v);
					})
					return prev
				}),
				tap(j => console.log(j)),
				filter((z: any) => z.userUid !== uid),
			)
		return selection;
		// selection.subscribe();
	}


	aband(req, userUid) {
		console.log(req, userUid);
		this.afs.collection('users').doc(userUid).collection('requetes').doc(req.uid).set(Object.assign({}, req))
	}


	sendResponse(msg, req) {
		console.log(msg);
		this.afs.collection('requetes').doc(req).collection('reponses').doc(msg.uid).set(Object.assign({}, msg));
	}



	getRequestResponses(uid): Observable<any[]> {
		return this.afs.collection('requetes').doc(uid).collection('reponses')
			.valueChanges()
			.pipe(
				map(req => {
					const reqSort = _.orderBy(req, ['timestamp'], ['desc']);
					return reqSort;
				}),share()
			);
	}

	updateResponse(rep, req) {
		console.log(rep, req)
		this.afs.collection('requetes').doc(req).collection('reponses').doc(rep.uid).update(Object.assign({}, rep));
	}

}
