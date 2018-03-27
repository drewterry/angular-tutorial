import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string): void {
    name = name.trim();
    if(!name) { return };
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        if(hero) { this.heroes.push(hero) }
      })
  }
  
  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero)
      .subscribe();
    //this.getHeroes();
    this.heroes = this.heroes.filter(h => h !== hero);
  }
  
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

}
