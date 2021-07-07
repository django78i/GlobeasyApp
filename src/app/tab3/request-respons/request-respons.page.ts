import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-respons',
  templateUrl: './request-respons.page.html',
  styleUrls: ['./request-respons.page.scss'],
})
export class RequestResponsPage implements OnInit {

  constructor(public navCtl: NavController) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtl.navigateBack('tabs/tab3');
  }


}
