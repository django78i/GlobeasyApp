import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordeonComponent } from 'src/app/components/accordeon/accordeon.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MascotteComponent } from 'src/app/components/mascotte/mascotte.component';
import { VisitFormComponent } from 'src/app/components/visit-form/visit-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { PreferencesModalComponent } from 'src/app/components/preferences-modal/preferences-modal.component';
import { PhotoModule } from '../photo.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    AccordeonComponent,
    MascotteComponent,
    VisitFormComponent,
    LoadingComponent,
    PreferencesModalComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatSelectCountryModule,
    HttpClientModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
    // PhotoModule
  ],
  exports: [
    AccordeonComponent,
    MascotteComponent,
    VisitFormComponent,
    PreferencesModalComponent,
    LoadingComponent
  ]

})
export class AccordeonModule { }
