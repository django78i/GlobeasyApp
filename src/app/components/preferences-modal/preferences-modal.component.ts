import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.component.html',
  styleUrls: ['./preferences-modal.component.scss'],
})
export class PreferencesModalComponent implements OnInit {

  @Input() user: any;

  constructor(public modalController: ModalController) { }

  ngOnInit() { 
    console.log(this.user);
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  remove(i) {
    console.log(i);
  }

}
