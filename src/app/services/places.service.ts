import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(public afs: AngularFirestore) { }

  getPlaces() {
    console.log('la');
    return this.afs.collection('interest').valueChanges().pipe(
      map(r => r.filter((v: any) => v.show == true)),
      share()
    );
  }


	getPartnerList(part) {
    console.log(part);
		return this.afs.collection('interest', ref => ref.where('partners', '==', part)).valueChanges();
	}

}
