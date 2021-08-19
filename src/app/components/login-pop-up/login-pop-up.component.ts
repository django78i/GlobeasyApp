import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-login-pop-up',
  templateUrl: './login-pop-up.component.html',
  styleUrls: ['./login-pop-up.component.scss'],
})
export class LoginPopUpComponent implements OnInit {

  seg: string = "login";
  mail: any;
  password: any;
  pseudo: any;
  errorMessage: Observable<string>;

  constructor(public modalController: ModalController, public userService: UserServiceService, public navCtl: NavController) { }

  ngOnInit() {
    this.errorMessage = this.userService.errorMessage;
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  segmentChanged(ev: any) {
    const val = ev.detail.value
    console.log('Segment changed', val);
    this.seg = val.includes('register') ? 'register' : 'login';
  }

  createUser() {
    this.userService.createUserMailPassword(this.mail, this.password, this.pseudo)
      .then((r) => {
        this.dismiss();
        // this.navCtl.navigateForward('');
      });
  }

  logUser() {
    this.userService.logMail(this.mail, this.password)
      .then((r) => {
        this.dismiss();
      });
  }
}
