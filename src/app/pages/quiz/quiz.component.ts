import { Component, OnInit } from '@angular/core';
import { PokemonfetcherService } from 'src/app/pokemonfetcher.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizFormGroup: FormGroup;
  currentPokemon;
  wantedType;
  pokemonURLsOfWantedType;
  pokemonOfWantedType = [];

  constructor(
    private pfs: PokemonfetcherService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.quizFormGroup = this.fb.group({
      pokemon: 'Pikachu',
      wantedType: 'normal'
    });
    this.getPokemon('Pikachu');
    this.getPokemonListBasedOnType('normal');
  }

  ngOnInit() {
  }

  getPokemon(pokemonname: string) {
    console.log("hi", pokemonname)
    this.pfs.getPokemon(pokemonname.toLowerCase()).subscribe(result => {
      this.currentPokemon = result;
      console.log('Name: ', result.name)
      console.log('REsult: ', result)
      return result;
    });
  }

  getPokemonFromURL(url: string) {
    this.pfs.getPokemonFromURL(url).subscribe(result => {
      this.pokemonOfWantedType.push(result);
    });
  }

  getPokemonListBasedOnType(type: string) {
    this.pokemonOfWantedType = [];
    this.pfs.getPokemonListBasedOnType(type.toLowerCase()).subscribe(result => {
      this.wantedType = type;
      console.log('result: ', result.pokemon);
      // this.pfs.getPokemonFromURL(result)
      this.pokemonURLsOfWantedType = result.pokemon;
      console.log("translatePokemonFromUrl: ", this.pokemonURLsOfWantedType)
      this.translatePokemonFromUrl(this.pokemonURLsOfWantedType);
    });

  }

  translatePokemonFromUrl(list) {
    console.log("List. ", list)
    list.forEach(pkmn => {
      console.log("pokemon name: ", pkmn.pokemon.name)
      console.log("pokemon url: ", pkmn.pokemon.url)

      this.getPokemonFromURL(pkmn.pokemon.url);
    });
    console.log("pokemonOfWantedType: ", this.pokemonOfWantedType)
  }

  updateResult() {
    this.getPokemon(this.quizFormGroup.get('pokemon').value);
    this.getPokemonListBasedOnType(this.quizFormGroup.get('wantedType').value);
  }

  goHome() {
    this.router.navigate(['']);
  }

}
