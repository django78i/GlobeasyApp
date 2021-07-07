import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public auth: AngularFireAuth, private us : UserServiceService) { }

  logout() {
    console.log('out');
    this.us.signout();
  }

}
