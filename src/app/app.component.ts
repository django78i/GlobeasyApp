import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: Observable<any>;

  constructor(private userService: UserServiceService, private auth: AngularFireAuth) {

    this.auth.authState.pipe(
      tap(user => {
        if (user) {
          this.user = this.userService.getUser(user.uid);
        }
      })
    ).subscribe();

  }
}
