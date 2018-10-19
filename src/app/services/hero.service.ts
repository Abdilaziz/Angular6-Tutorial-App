import { Injectable } from '@angular/core';
// Observable is a key class in the RxJS library
// we can simulate getting datat from the server with the RxJS of() function
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

// an alternative to using HttpClient (which uses the browsers XMLHttpRequest interface from the browsers)
// is to use ajax from the RxJS library https://angular.io/guide/rx-library
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// the decorator @Injectable marks the class as one that participates in the dependency injection system
// this is done by registering a provider. A provider is something that can create or deliver a service
// in this case it instantiates the HeroService class to provide the service

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

// When you provide the service to the root level, angular creates a single instance of HeroService and injects into any class that
// asks for it. Angular optimized to remove the service if it turns out it isn't used.

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesURL: string = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService ) {
    // console.log('HeroSerivce Constructor');
   }

  // The hero service is for managing data for the view

  getSynchronousMockHeroes(): Hero[] {
    return HEROES;
  }

  getMockHeroesObservable(): Observable<Hero[]> {
    this.log(`fetched heroes`);
    return of(HEROES); // this returns a single value, the array of mock heroes
  }

  getHttpHeroes(): Observable<Hero[]> {
    // Even though observables can return multiple values over time, HTTP is a request/response protocol
    // You make a request and get a single response. an observable from HttpClient will emit a single value and then complete, never to emit again.
    //HttpClient.get returns the body of the response as an untyped JSON object (no type defined), so the optional type specifier <Hero[]> gives you a typed result object
    
    // to catch errors you "pipe" the observable result through an RxJS catchError()
    // tap operator looks at observable values, does something with them, and passes them along. the tap callback doesn't touch the values themselves.
    return this.http.get<Hero[]>(this.heroesURL)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
        );
  }

  getMockHeroObservable(id: number): Observable<Hero> {
    this.log(`fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id)); // returns the Hero matching the id provided
  }

  // url is constructed with desired hero's id
  // server should respond with a single hero rather than an array of heroes
  getHttpHero(id:number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap( _ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  getHeroes(): Observable<Hero[]> {
    return this.getHttpHeroes();
  }

  getHero(id: number): Observable<Hero> {
    return this.getHttpHero(id);
  }

  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, httpOptions).pipe(
      tap( _ => this.log(`updated hero id=${hero.id}`) ),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // https://angular.io/tutorial/toh-pt6
  // More examples of adding new Heroes and Deleting Heroes, and a Search

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    // each service method returns a different kind of Observable result, handleError function takes a parameter so it can return the safe value as the type the app expects.
    return of(result as T);
  };
}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`); // Backtics ` define a JavaScript template literal for embedding the id.
  }
  
}
