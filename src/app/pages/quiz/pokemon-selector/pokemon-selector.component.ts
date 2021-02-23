import { Component, OnInit } from '@angular/core';
import { PokemonfetcherService } from 'src/app/pokemonfetcher.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonstorageService } from 'src/app/pokemonstorage.service';
import { ConfirmdialogComponent } from 'src/app/confirmdialog/confirmdialog.component';
import { MatDialog } from '@angular/material';
import { listOfAllPokemonSrc } from '../../../pokemon';
import { allTypes, allGenerations } from 'src/app/variables';

@Component({
  selector: 'app-pokemon-selector',
  templateUrl: './pokemon-selector.component.html',
})
export class PokemonSelectorComponent implements OnInit {
  dataReady = false;
  listURLsReady = false;
  listDataReady = false;

  selectedBox = null; // What box user wants to fill

  quizFormGroup: FormGroup;

  selectedPokemon;

  savedFavorites;

  allPokemonTypes = [];
  listOfAllPokemon = [];
  generations = [];
  chosenCategory = null;
  chosenType = '';

  constructor(
    private pfs: PokemonfetcherService,
    private router: Router,
    public pss: PokemonstorageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.allPokemonTypes = allTypes;
    this.generations = allGenerations;
    this.listOfAllPokemon = listOfAllPokemonSrc;
    this.chosenCategory = this.pss.getChosenCategory();
    this.chosenType = this.pss.getChosenType();

    this.updateFavoritesInTable();
  }

  isPokemonCorrectType(pokemon) {
    // console.log("pokemon.types: ", pokemon.types)
    // return (pokemon.types.find(t => {
    //   if (t.type.name && this.chosenType) {
    //     return (t.type.name.toLowerCase() === this.chosenType.toLowerCase());
    //   }
    // }));
    // console.log("chosenType: ", this.pss.getChosenType())
    this.updateChosenType();
    if (this.chosenType) {
      return pokemon.types.find(
        (t) => t.type.name.toLowerCase() === this.chosenType.toLowerCase()
      );
    }

    // return pokemon.types.find(e => {
    //   e.type.name.toLowerCase() === this.pss.getChosenType().toLowerCase()
    // });
  }

  updateChosenCategory() {
    this.chosenCategory = this.pss.getChosenCategory();
  }

  updateChosenType() {
    this.chosenType = this.pss.getChosenType();
  }

  showGeneration(n: number) {
    return this.generations.find((e) => e.number === n).show;
  }

  toggleGeneration(n: number) {
    this.generations.find((e) => e.number === n).show = !this.generations.find(
      (e) => e.number === n
    ).show;
  }

  resetGenerationToggles() {
    this.generations = this.generations.map(function (x) {
      x.show = true;
      return x;
    });
  }

  selectPokemon(pokemon) {
    this.selectedPokemon = pokemon;
  }

  isSelected(pokemon) {
    if (this.selectedPokemon) {
      return pokemon.pokemonId === this.selectedPokemon.pokemonId;
    }
  }

  savePokemonAsFavorite(generation: number, type: string, pokemon) {
    if (generation === 0) {
      // This is all gens
    }
    this.pss.savePokemon(generation, type, pokemon);
    console.log(
      'selected generation ',
      generation,
      ' and type ',
      type,
      ' with pokemon ',
      pokemon
    );

    this.updateFavoritesInTable();
  }

  updateFavoritesInTable() {
    this.savedFavorites = this.pss.getSavedFavoritesFromLocalStorage();
  }

  getFavoriteForCategoryAndType(category: number, type: string) {
    const savedFavorites = this.pss.getSavedFavoritesFromLocalStorage();
    let favorite = null;
    if (savedFavorites) {
      const foundCat = savedFavorites.find((c) => c.id === category);
      if (
        foundCat &&
        foundCat.favoriteTypes &&
        foundCat.favoriteTypes.find((t) => t.type === type)
      ) {
        favorite = foundCat.favoriteTypes.find((t) => t.type === type).pokemon;
      }
      return favorite;
    }
  }

  clearTable() {
    this.pss.deleteLocalStorage();
    this.savedFavorites = [];
    this.updateFavoritesInTable();
  }

  openResetDialog(): void {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '250px',
      data: {
        title: 'Reset table',
        question: 'Do you want to delete all content in your table?',
        yesOptionTitle: 'Yes',
        noOptionTitle: 'No',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clearTable();
      }
    });
  }

  goHome() {
    this.router.navigate(['']);
  }
}
