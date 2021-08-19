import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Country } from '@angular-material-extensions/select-country';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.scss'],
})
export class VisitFormComponent implements OnInit, OnDestroy {
  countryFormControl = new FormControl();
  countryFormGroup: FormGroup;
  countries: any[] = [];

  @Output() countryEvent = new EventEmitter;
  @Output() removed = new EventEmitter;

  sub: Subscription;
  constructor(private formBuilder: FormBuilder, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,) {
    angulartics2GoogleAnalytics.startTracking();

  }

  ngOnInit() {
    this.intiForm();
    this.sub = this.countryFormGroup.get('country').valueChanges
      .subscribe((country) => {
        console.log('ici');
        console.log('this.countryFormGroup.get("country").valueChanges', country)
      });

  }


  intiForm() {
    this.countryFormGroup = this.formBuilder.group({
      country: []
    });
  }

  onCountrySelected($event) {
    console.log($event);

    this.countries.push(this.flag($event));
    this.countryEvent.emit(this.flag($event));
  }

  remove(i): void {
    this.countries.splice(i, 1);
    this.removed.emit(i);
  }

  flag(f) {
    const code = f.alpha2Code;
    code.toLowerCase();
    console.log(code.toLowerCase());
    const pays = {
      nom: f.name,
      alphacode2: f.alpha2Code,
      alphacode3: f.alpha3Code,
      image: `../../../assets/svg-country-flags/svg/${code.toLowerCase()}.svg`
    }
    console.log(pays);
    return pays;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
