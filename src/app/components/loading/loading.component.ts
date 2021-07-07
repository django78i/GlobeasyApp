import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(private navCtl: NavController, public modalController: ModalController) { }

  ngOnInit() {
    setTimeout(() => {
      this.navigate();
      this.dismiss();
    }, 2000)
  }



  navigate() {
    this.navCtl.navigateForward(['tabs']);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


}
