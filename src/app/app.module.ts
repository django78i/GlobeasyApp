import { UserServiceService } from './services/user-service.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PlacesService } from './services/places.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { MatTabsModule } from '@angular/material/tabs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Downloader } from '@ionic-native/downloader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TimeTransPipe } from './pipe/time-trans.pipe';
import { TimesPipe } from './pipe/times.pipe';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
// import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    // TimeTransPipe
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDH2CoK4mxMy4nyas7Q2eJ-09DdJkEJbOU'
    }),
    BrowserAnimationsModule,
    MatStepperModule,
    CdkStepperModule,
    ReactiveFormsModule,
    MatSelectCountryModule.forRoot('fr'),
    HttpClientModule,
    Angulartics2Module.forRoot(),
    MatTabsModule,
    NgbModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserServiceService,
    PlacesService,
    GooglePlus,
    FirebaseAuthentication,
    NativeStorage
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
