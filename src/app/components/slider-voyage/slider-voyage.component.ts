import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slider-voyage',
  templateUrl: './slider-voyage.component.html',
  styleUrls: ['./slider-voyage.component.scss'],
})
export class SliderVoyageComponent implements OnInit {

  slideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 20,
    // navigation : true,
  };

  tablTemplate: any[] = [{
    nb: '1'
  },
  {
    nb: '2'
  }
  ];

  rating3: number = 3;
  @Output() navigtionData: EventEmitter<any[]> = new EventEmitter;


  @Input() places: any[];

  constructor() { }

  ngOnInit() {
    console.log(this.places);
   }


  navigate(place) {
    console.log(place);
    this.navigtionData.emit(place);
  }

}
