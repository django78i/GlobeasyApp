import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Animation, AnimationController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss'],
})
export class ModalTestComponent implements OnInit, AfterViewInit {


  @ViewChild('header') headerImage: ElementRef;
  anim: Animation;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private renderer: Renderer2,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let coords = this.navParams.get('coords');
    console.log(coords);


    const photo = this.animationCtrl.create()
      .addElement(document.querySelector('.tof'))
      .beforeStyles({
        'opacity': 1,
        // 'transform': `translate3d(12px, ${coords.y}px, 0px)`,
        // 'width': `${coords.width}px`,
        // 'height': 0
      })
      // .fromTo('transform', `translate3d(12px, ${coords.y}px, 0px)`, 'translate3d(0, 0, 0)')
      // .fromTo('width', `${coords.width}px`, '100%')
      // .fromTo('height', 0, '100%')
      .keyframes([
        { offset: 0, width: `${coords.width}px`, height: 0, transform: `translate3d(12px, ${coords.y}px, 0px)` },
        { offset: 0.2, width: `${coords.width}px`, height: 0 , transform: `translate3d(12px, ${coords.y-56}px, 0px)`},
        { offset: 1, width: '100%', height: '100%', trasnform: 'translate3d(0, 0, 0)' }
      ])
      // .to('width', '100%')
      // .to('height', '100%')
      // .to('transform', `translate3d(0, 0, 0)`)
      .duration(1500)
    photo.play();


    this.anim = this.animationCtrl.create()
      .addAnimation([
        photo
      ])


  }

  close() {
    const an = this.anim.direction('reverse');
    an.play()
    this.modalCtrl.dismiss();


  }

}
