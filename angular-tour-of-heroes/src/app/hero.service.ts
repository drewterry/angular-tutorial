import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable ,  of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
       .pipe(
        tap(() => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );
  }
  
  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero> (`${this.heroesUrl}/${id}`)
      .pipe(
          tap(() => this.log(`fetched hero id=${id}`)),
          catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(() => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>(`updateHero id=${hero.id}`))
      );
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero (hero: Hero): Observable<Hero> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${hero.id}`, httpOptions)
      .pipe(
        tap(() => this.log(`deleted hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>(`deleteHero id=${hero.id}`))
      );
  }

  searchHeroes (term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(() => this.log(`found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
  
  private heroesUrl = 'api/heroes';  // URL to web api

  private handleError<T> (operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
