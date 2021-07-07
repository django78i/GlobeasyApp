import { NavController } from '@ionic/angular';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements AfterViewInit {
  @ViewChild('specialTab', { read: ElementRef, static: false }) specialTab: ElementRef;
  @ViewChild('dat') dat: any;
  active: Boolean = false;

  constructor(public router: Router, public elmRef: ElementRef, private navCtl: NavController) {
  }


  ngAfterViewInit() {
  }

  navigate() {
    console.log(this.dat);
    this.specialTab.nativeElement.classList.add('activeSocial');
    console.log(this.specialTab);
    this.dat.nativeElement.style.background = "white";
    this.navCtl.navigateForward('tabs/tab3');

  }


  remove() {
    this.specialTab.nativeElement.classList.remove('activeSocial');
    this.dat.nativeElement.style.background = "linear-gradient(192.04deg, #25cae5 6.05%, #4c71e5 65.21%, #7b06e5 100%)";
  }


}
