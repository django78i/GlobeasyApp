import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public navCtl: NavController) { }

  navigate() {
    this.navCtl.navigateForward('/request-respons');
  }

  navigateBack() {
    this.navCtl.navigateBack('tabs/tab3/pref/voyage-display');
  }

  

}
