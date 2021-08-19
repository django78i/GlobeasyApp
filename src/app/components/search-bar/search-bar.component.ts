import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  @Input() places: any[];
  @Output() placeEvent: EventEmitter<any> = new EventEmitter;
  placeSub: Subject<any> = new Subject;
  place: any;
  place$: Observable<any>;

  constructor() { }

  ngOnInit() {

  }


  search() {
    console.log(this.place);
    if (this.place != ''){
      const fil = this.places.filter(p => p.nom.toLowerCase().includes(this.place.toLowerCase()));
      fil.length ? '' : this.placeSub.next([{ nom: 'Aucun résultat' }]);
      this.placeEvent.emit(fil);
      console.log(fil);
    }else{
      this.placeEvent.emit([]);
    }
  }

  clear() {
    this.place = '';
    this.placeEvent.emit([]);
    console.log(this.place);
    this.placeSub.next(null);
  }

}
