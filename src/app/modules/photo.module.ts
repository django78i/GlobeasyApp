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
        MatTabsModule

    ],
    declarations: [
        PhotoComponent,
        PreferencesModalComponent,
        ShareComponentComponent,
        ResponseRequestComponent,
        SliderVoyageComponent,
        FicheRequeteComponent,
        DescriptionPopUpComponent,
        PopPartnerComponent,
        BadgePlaceComponent

    ],
    exports: [
        PhotoComponent,
        PreferencesModalComponent,
        ShareComponentComponent,
        ResponseRequestComponent,
        SliderVoyageComponent,
        FicheRequeteComponent,
        DescriptionPopUpComponent,
        PopPartnerComponent,
        BadgePlaceComponent
    ]
})
export class PhotoModule { }
