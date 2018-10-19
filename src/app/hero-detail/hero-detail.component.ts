import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

import { ActivatedRoute } from '@angular/router'; // Holds info about the route to this instance of the HeroDetailComponent (Gets the parameters extracted from the URL id)
import { Location } from '@angular/common'; // Angular Service for interacting with the browser (can navigate to the view that navigated here)
import { HeroService } from '../services/hero.service';

// Hero Detail now needs a way to acquire the Hero from the id via the Hero Service.

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero; // @Input() 

  constructor( 
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
   ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    // route.snapshot is a static image of the route info shortly after the componenet was created.
    // paramMap is a dictionary of route parameter valuses extracted from the URL
    // Route parameters are always strings so the JavaScript + operator is used to convert the string to a number

    // In typescript, there is a naming convention for observables (a trailing "$" sign)
    let heroObservable$ = this.heroService.getHero(id);
    heroObservable$.subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    let heroObservable$ = this.heroService.updateHero(this.hero);
    heroObservable$.subscribe( () => this.goBack() );
  }

}
