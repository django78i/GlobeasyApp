// import { Animation, AnimationController } from '@ionic/angular';


export function myFadeInAnimation(
    // baseEl: HTMLElement
)
// : Promise<Animation>
{


    // const backdropAnimation = new AnimationC();
    // backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    // const wrapperAnimation = new AnimationC();
    // wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    // wrapperAnimation.beforeStyles({ 'opacity': 1 })
    //     .fromTo('translateX', '0%', '0%');

    // backdropAnimation.fromTo('opacity', 0.01, 0.4);
    const wrapperAnimation = this.animationCtrl.create()
        .addElement(document.querySelector('.modal-wrapper'))
        .fromTo('translateX', '0%', '0%')


    this.animationCtrl.create()
        .addElement(document)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(1000)
        .beforeAddClass('show-modal')
        .add(wrapperAnimation)

    // return Promise.resolve(baseAnimation
    //     .addElement(document)
    //     .easing('cubic-bezier(0.36,0.66,0.04,1)')
    //     .duration(1000)
    //     .beforeAddClass('show-modal')
    //     .add(wrapperAnimation));

}