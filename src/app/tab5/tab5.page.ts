import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  user: Observable<any>;

  constructor(private userService: UserServiceService, private auth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.onAuthStateChanged(r => {
      if (r) {
        console.log(r);
        this.user = this.userService.getUser(r.uid);
      }
    })
  }

}
