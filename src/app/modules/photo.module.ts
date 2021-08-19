import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { PhotoComponent } from '../components/photo/photo.component';
import { PreferencesModalComponent } from '../components/preferences-modal/preferences-modal.component';
import { ShareComponentComponent } from '../components/share-component/share-component.component';
import { ResponseRequestComponent } from '../components/response-request/response-request.component';
import { SliderVoyageComponent } from '../components/slider-voyage/slider-voyage.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FicheRequeteComponent } from '../components/fiche-requete/fiche-requete.component';
import { DescriptionPopUpComponent } from '../components/description-pop-up/description-pop-up.component';
import { AgmCoreModule } from '@agm/core';
import {MatChipsModule} from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { PopPartnerComponent } from '../components/pop-partner/pop-partner.component';
import { BadgePlaceComponent } from '../components/badge-place/badge-place.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ModalTestComponent } from '../components/modal-test/modal-test.component';
import { LoginPopUpComponent } from '../components/login-pop-up/login-pop-up.component';
import { ChatPopUpComponent } from '../components/chat-pop-up/chat-pop-up.component';
import { CreateRequestPopComponent } from '../components/create-request-pop/create-request-pop.component';
import { AppRoutingModule } from '../app-routing.module';
import { InputFormComponent } from '../components/input-form/input-form.component';
import { PopOverComponent } from '../components/pop-over/pop-over.component';
import { TimesPipe } from '../pipe/times.pipe';
import { ChatFromRequestComponent } from '../components/chat-from-request/chat-from-request.component';

@NgModule({
    imports: [CommonModule,
        FormsModule,
        IonicModule,
        CdkStepperModule,
        NgxStarRatingModule,
        MatChipsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDH2CoK4mxMy4nyas7Q2eJ-09DdJkEJbOU'
        }),
        MatTabsModule,
        // AppRoutingModule

    ],
    declarations: [
        PhotoComponent,
        ShareComponentComponent,
        ResponseRequestComponent,
        SliderVoyageComponent,
        FicheRequeteComponent,
        DescriptionPopUpComponent,
        PopPartnerComponent,
        BadgePlaceComponent,
        SearchBarComponent,
        ModalTestComponent,
        LoginPopUpComponent,
        ChatPopUpComponent,
        CreateRequestPopComponent,
        InputFormComponent,
        PopOverComponent,
        TimesPipe,
        ChatFromRequestComponent

    ],
    exports: [
        PhotoComponent,
        ShareComponentComponent,
        ResponseRequestComponent,
        SliderVoyageComponent,
        FicheRequeteComponent,
        DescriptionPopUpComponent,
        PopPartnerComponent,
        BadgePlaceComponent,
        SearchBarComponent,
        ModalTestComponent,
        LoginPopUpComponent,
        ChatPopUpComponent,
        CreateRequestPopComponent,
        InputFormComponent,
        PopOverComponent,
        ChatFromRequestComponent
    ]
})
export class PhotoModule { }
