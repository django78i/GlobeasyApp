import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fiche-requete',
  templateUrl: './fiche-requete.component.html',
  styleUrls: ['./fiche-requete.component.scss'],
  // animations: [
  //   trigger('out', [
  //     transition(':leave', [
  //       animate('500ms ease', style({ transform: 'translateX(500px)' }))
  //     ])
  //   ])
  // ]

})
export class FicheRequeteComponent implements OnInit {

  @Input() requete: any;
  @Input() index: number;
  @Output() refused = new EventEmitter;
  @Output() open = new EventEmitter;
  constructor() { }

  ngOnInit() { }

  pop() {
    this.refused.emit(this.index);
  }


  modal(req) {
    this.open.emit(req);
  }

}
