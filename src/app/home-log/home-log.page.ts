import { UserServiceService } from './../services/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-log',
  templateUrl: './home-log.page.html',
  styleUrls: ['./home-log.page.scss'],
})
export class HomeLogPage implements OnInit {

	slideOpts = {
		slidesPerView: 1,
		spaceBetween: 20,
		// navigation : true,
	};

  contenuSlide : any[] =[
    {
      titre : "Rejoignez l'aventure",
      contenu : "Préparez vos futurs voyages en intégrant la première application créée par et pour des voyageurs 🗺️ (Et tout ça gratuitement 😉)",
      image : "../../assets/images/map.svg",
      fond : "linear-gradient(180deg, #5ED996 0%, #2ACFA8 100%)"
    },
    {
      titre : "Rejoignez l'aventure",
      contenu : "Préparez vos futurs voyages en intégrant la première application créée par et pour des voyageurs 🗺️ (Et tout ça gratuitement 😉)",
      image : "../../assets/images/map.svg",
      fond : "linear-gradient(180deg, #F6AF98 0%, #F498BB 100%)"
    },
  ]

  constructor(private uService: UserServiceService) { }

  ngOnInit() {
  }

  login() {
    this.uService.googleSignIn();
  }

}
