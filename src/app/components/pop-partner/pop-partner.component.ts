import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-pop-partner',
  templateUrl: './pop-partner.component.html',
  styleUrls: ['./pop-partner.component.scss'],
})
export class PopPartnerComponent implements OnInit {

  constructor(public modalController: ModalController, public palceService: PlacesService) { }
  @Input() partner: any;
  places: Observable<any>;

  ngOnInit() {
    console.log(this.partner);
    this.places = this.palceService.getPartnerList(this.partner).pipe(
      tap(r=>console.log(r))
    );
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  

}
