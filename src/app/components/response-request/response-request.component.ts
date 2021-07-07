import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-response-request',
  templateUrl: './response-request.component.html',
  styleUrls: ['./response-request.component.scss'],
})
export class ResponseRequestComponent implements OnInit {

  @Input() requete: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() { }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
