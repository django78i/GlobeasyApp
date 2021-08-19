import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { PlacesService } from 'src/app/services/places.service';

@Component({
  selector: 'app-share-component',
  templateUrl: './share-component.component.html',
  styleUrls: ['./share-component.component.scss'],
})
export class ShareComponentComponent implements OnInit {

  enableBackdropDismiss = false;
  showBackdrop = false;
  shouldPropagate = false;
  places: Observable<any>;
  slideOpts = {
    slidesPerView: 1.4,
    spaceBetween: 20,
    // navigation : true,
  };
  rating4 = 3;


  constructor(public modalController: ModalController, public pls: PlacesService, public chatService: ChatService) {
    this.places = this.pls.getPlaces();

  }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  navigate(g) {
    this.dismiss();
  }



}
