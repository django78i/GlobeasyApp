import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mascotte',
  templateUrl: './mascotte.component.html',
  styleUrls: ['./mascotte.component.scss'],
})
export class MascotteComponent implements OnInit {

  @Input() message: any;

  constructor() { }

  ngOnInit() { }

}
