import { Component, OnInit, OnChanges } from '@angular/core';
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
  allPokemonTypes = [];

  generations = [
    { number: 1, show: true },
    { number: 2, show: true },
    { number: 3, show: true },
    { number: 4, show: true },
    { number: 5, show: true },
    { number: 6, show: true },
    { number: 7, show: true },
  ];

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
    this.getPokemonListBasedOnType('Normal');

    this.quizFormGroup.get('wantedType').valueChanges.subscribe(type => {
      this.getPokemonListBasedOnType(type);
      this.resetGenerationToggles();
    });
  }

  ngOnInit() {
    this.setAllPokemonTypes();
  }

  getPokemon(pokemonname: string) {
    this.pfs.getPokemon(pokemonname.toLowerCase()).subscribe(result => {
      this.currentPokemon = result;
      return result;
    });
  }

  getPokemonListBasedOnType(type: string) {
    this.pokemonOfWantedType = [];
    this.pfs.getPokemonListBasedOnType(type.toLowerCase()).subscribe(result => {
      this.wantedType = type;
      this.pokemonURLsOfWantedType = result.pokemon;
      console.log('translatePokemonFromUrl: ', this.pokemonURLsOfWantedType)
      this.pokemonURLsOfWantedType.forEach(pkmn => {
        this.setPokemonFromURL(pkmn.pokemon.url);
      });
    });
  }

  sortPokemonByID(list) {
    list.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  setAllPokemonTypes() {
    this.pfs.getAllPokemonGenerations().subscribe(res => {
      res.forEach(gen => {
        gen.types.forEach(type => {
          if (type.name !== 'shadow' && type.name !== 'unknown') {
            this.allPokemonTypes.push(type);
          }
        });
      });
    });
  }

  setPokemonFromURL(url: string) {
    this.pfs.getPokemonFromURL(url).subscribe(result => {
      this.pokemonOfWantedType.push(result);
      this.sortPokemonByID(this.pokemonOfWantedType);
    });
  }

  updateResult() {
    this.getPokemon(this.quizFormGroup.get('pokemon').value);
    this.getPokemonListBasedOnType(this.quizFormGroup.get('wantedType').value);
  }

  getGenByPokemonID(pokemonid: number): number {
    if (0 < pokemonid && pokemonid <= 151) {
      return 1;
    } else if (151 < pokemonid && pokemonid <= 251) {
      return 2;
    } else if (251 < pokemonid && pokemonid <= 386) {
      return 3;
    } else if (386 < pokemonid && pokemonid <= 493) {
      return 4;
    } else if (493 < pokemonid && pokemonid <= 649) {
      return 5;
    } else if (649 < pokemonid && pokemonid <= 721) {
      return 6;
    } else if (721 < pokemonid && pokemonid <= 809) {
      return 7;
    } else {
      return 8;
    }
  }

  showGeneration(n: number) {
    return this.generations.find(e => e.number === n).show;
  }

  toggleGeneration(n: number) {
    this.generations.find(e => e.number === n).show = !this.generations.find(e => e.number === n).show;
  }

  resetGenerationToggles() {
    this.generations = this.generations.map(function (x) {
      x.show = true;
      return x;
    });
  }

  selectPokemon(pokemon) {
    console.log('You have chosen ', pokemon)
  }

  goHome() {
    this.router.navigate(['']);
  }

}
