import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { listOfAllPokemonSrc } from '../../pokemon';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {
  listOfAllPokemon = [];
  
  constructor(
    private router: Router
  ) {
    this.listOfAllPokemon = listOfAllPokemonSrc;
  }

  ngOnInit() {
  }

  start() {
    console.log('Starting');
    this.router.navigate(['/quiz']);
  }

}
