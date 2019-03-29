import { Component, OnInit } from '@angular/core';
import { PokemonfetcherService } from 'src/app/pokemonfetcher.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
  styleUrls: ['./pokemon-selector.component.scss']
})
export class PokemonSelectorComponent implements OnInit {
  dataReady = false;

  selectedBox = null; // What box user wants to fill

  quizFormGroup: FormGroup;
  allPokemonTypes = [];

  chosenGeneration;
  chosenType;

  selectedPokemon;

  listOfAllPokemon = [
    { generationId: 1, pokemonList: [] },
    { generationId: 2, pokemonList: [] },
    { generationId: 3, pokemonList: [] },
    { generationId: 4, pokemonList: [] },
    { generationId: 5, pokemonList: [] },
    { generationId: 6, pokemonList: [] },
    { generationId: 7, pokemonList: [] }
  ];

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
    // this.quizFormGroup = this.fb.group({
    //   chosenType: 'normal',
    //   chosenGeneration: 2
    // });

    // this.quizFormGroup.valueChanges.subscribe(() => {
    //   this.updateFormGroupValues();
    //   this.resetGenerationToggles();
    // });
  }

  ngOnInit() {
    this.setAllPokemonTypes();
    this.setAllPokemon();
  }

  setAllPokemon() {
    this.pfs.getAllPokemonGenerations().subscribe(res => {
      res.forEach(gen => {
        gen.types.forEach(type => {
          if (type.name !== 'shadow' && type.name !== 'unknown') {
            this.pfs.getPokemonListBasedOnType(type.name).subscribe(list => {
              list.pokemon.forEach(pokemon => {
                this.pfs.getPokemonFromURL(pokemon.pokemon.url).subscribe(pkmn => {
                  const found = this.listOfAllPokemon.find(e => e.generationId === this.getGenByPokemonID(pkmn.id));
                  if (found && !found.pokemonList.find(e => e.id === pkmn.id)) {
                    found.pokemonList.push(pkmn);
                    this.sortPokemonByID(found.pokemonList);
                    // this.dataReady = true;
                  }
                },
                  error => {
                    // On error
                  },
                  () => {
                    // this.updateFormGroupValues();
                    this.dataReady = true;
                  });
              });
            });
          }
        });
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

  // updateFormGroupValues() {
  //   this.chosenGeneration = this.quizFormGroup.get('chosenGeneration').value;
  //   this.chosenType = this.quizFormGroup.get('chosenType').value;
  // }

  updateChosenType(type: string) {
    this.chosenType = type;
  }

  getGenByPokemonID(pokemonid: number): number {
    if (pokemonid <= 151) {
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

  isPokemonCorrectType(pokemon) {
    return (pokemon.types.find(t => t.type.name.toLowerCase() === this.chosenType.toLowerCase()));
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
    console.log(pokemon);
    this.selectedPokemon = pokemon;
  }

  isSelected(pokemon) {
    if (this.selectedPokemon) {
      return (pokemon.id === this.selectedPokemon.id);
    }
  }

  selectTableBox(generation: number, type: string) {
    if (generation === 0) {
      // This is all gens
    }
    console.log('selected generation ', generation, ' and type ', type);
    this.chosenGeneration = generation;
    this.chosenType = type;
  }

  goHome() {
    this.router.navigate(['']);
  }

}
