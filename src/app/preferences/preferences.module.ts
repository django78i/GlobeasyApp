import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PreferencesPageRoutingModule } from './preferences-routing.module';
import { PreferencesPage } from './preferences.page';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import {MatChipsModule} from '@angular/material/chips';
import { AccordeonModule } from '../modules/accordeon/accordeon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreferencesPageRoutingModule,
    CdkStepperModule,
    ExploreContainerComponentModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    AccordeonModule
  ],
  declarations: [PreferencesPage]
})
export class PreferencesPageModule { }
