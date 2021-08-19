import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, iif, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as _ from "lodash";

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	rooms$: Observable<any[]>;
	roomsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
	singleRoomsSubject: BehaviorSubject<any> = new BehaviorSubject(null);
	room$: Observable<any>
	constructor(
		public afs: AngularFirestore,
		public auth: AngularFireAuth
	) { }


	createRoom(info) {
		this.afs.collection('rooms').doc(info.uid).set(Object.assign({}, info));
		// return this.afs.collection('rooms').doc(info.uid).valueChanges();

	}

	findRoom(creator, contact): Observable<any> {
		var id = creator.uid + contact.uid;
		var id1 = contact.uid + creator.uid;
		console.log(id, id1);
		const test = this.afs.collection('rooms').doc(id).valueChanges();
		const test1 = this.afs.collection('rooms').doc(id1).valueChanges();
		console.log(id, id1);
		this.room$ = combineLatest([
			test,
			test1
		]).
			pipe(
				tap(r => console.log(r)),
				map(([t, t1]) => t ? t : t1),
				tap(v => console.log(v))
			)

		return this.room$;
	}


	roomList(user): Observable<any[]> {
		this.roomsSubject.next(user);
		console.log(user);
		this.rooms$ = this.roomsSubject.pipe(
			switchMap(r => this.afs.collection('rooms').valueChanges()),
			map(r => {
				console.log(r);
				let filteredData;
				if (r) {
					filteredData = r.filter((v: any) => {
						return v.uid.includes(user) ? true : false;
					})
				}
				console.log(filteredData);
				return filteredData
			}),
			map(r => _.orderBy(r, ['timestamp'], ['desc'])),
			tap(z => console.log(z))
		)
		return this.rooms$

	}

	findMessages(id): Observable<any> {
		console.log(id)
		const msgList1 = this.afs.collection('rooms').doc(id).collection('messages').valueChanges()
			.pipe(
				map(msgs => _.orderBy(msgs, ['date'], ['asc'])),
			);
		return msgList1;
	}

	saveMessage(msg, room) {
		const roomCopy = {
			users: room.users,
			uid: room.uid,
			lastMsg: msg.text,
			timestamp: msg.date,
			dateCreation: room.dateCreation
		};
		console.log(roomCopy);
		console.log(msg)
		this.afs.collection('rooms').doc(room.uid).collection('messages').doc(msg.uid).set(Object.assign({}, msg));
		this.afs.collection('rooms').doc(room.uid).update(Object.assign({}, roomCopy));
	}

}
