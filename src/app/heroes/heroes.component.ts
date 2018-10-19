import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';

import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes', // The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template.
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
// Always export the component class so you can import it elsewhere ... like in the AppModule.
export class HeroesComponent implements OnInit {

  // heroes = HEROES; // Components shouldn't fetch data directly. They should just focus on presenting data and delegate data access to a service.
  heroes: Hero[];

  // selectedHero: Hero; // new instance of the Hero Object

  // onSelect(hero: Hero) {
  //   this.selectedHero = hero;
  // }

  // constructor(private logger: LoggerService) { }
  // adding the private heroService parameter means we are injecting the service into this component
  // When angular creates a HeroesComponent, the dependency injection system sets the heroService parameter to the singleton instance of HeroService.
  constructor( private heroService: HeroService ){  }


  getHeroes(): void {
    // because we are using mock data, this works. But when retrieving data from a server asynchronously the HeroServices getHerores function should 
    // have an asynchronous signature of some kind.
    // It can take a callback. It can return a Promise. It can return an Observable.
    // this.heroes = this.heroService.getSynchronousMockHeroes();

    // an Async method: returns an Observable
    // the subscription means the components property heroes is set when the request is complete
    let heroesObservable$ = this.heroService.getHeroes();
    heroesObservable$.subscribe( heroes => this.heroes = heroes );
  }

  // The ngOnInit is a lifecycle hook. Angular calls ngOnInit shortly after creating a component. It's a good place to put initialization logic.
  ngOnInit() {
    this.getHeroes();
    this.logIt('OnInit Hero Component Init');
  }

  logIt(msg: string) {
    console.log(msg);
  }

}
