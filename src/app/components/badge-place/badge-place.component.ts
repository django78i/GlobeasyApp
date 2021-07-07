import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge-place',
  templateUrl: './badge-place.component.html',
  styleUrls: ['./badge-place.component.scss'],
})
export class BadgePlaceComponent implements OnInit {

  @Input() place;
  rating3: 3;
  constructor() {
  }

  ngOnInit() {
    console.log(this.place)
  }

}
