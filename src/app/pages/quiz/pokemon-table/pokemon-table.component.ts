import { Component, OnInit } from '@angular/core';
import { pokemonTypes, allGenerations } from '../../../variables';
import { PokemonstorageService } from 'src/app/pokemonstorage.service';
import { MatDialog } from '@angular/material';
import { SelectordialogComponent } from '../selectordialog/selectordialog.component';
import { listOfAllPokemonSrc } from 'src/app/pokemon';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
})
export class PokemonTableComponent {
  dataReady = false;

  chosenCategory;
  chosenType;

  allPokemonTypes = [];
  generations = [];
  listOfAllPokemon = [];

  constructor(private pss: PokemonstorageService, public dialog: MatDialog) {
    this.allPokemonTypes = pokemonTypes;
    this.generations = allGenerations;
    this.listOfAllPokemon = listOfAllPokemonSrc;
  }

  selectTableBox(generation: number, type: string) {
    this.pss.selectTableBox(generation, type);
    this.updateChosenCategory();
    this.updateChosenType();

    const dialogRef = this.dialog.open(SelectordialogComponent, {
      data: {
        listOfAllPokemon: this.listOfAllPokemon,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  updateChosenCategory() {
    this.chosenCategory = this.pss.getChosenCategory();
  }

  updateChosenType() {
    this.chosenType = this.pss.getChosenType();
  }

  isTableBoxSelected(generation: number, type: string) {
    return this.chosenCategory === generation && this.chosenType === type;
  }

  getFavoriteForCategoryAndType(category: number, type: string) {
    const savedFavorites = this.pss.getSavedFavoritesFromLocalStorage();
    let favorite;
    if (savedFavorites) {
      const foundCat = savedFavorites.find((c) => c.id === category);
      if (
        foundCat &&
        foundCat.favoriteTypes &&
        foundCat.favoriteTypes.find((t) => t.type === type)
      ) {
        favorite = foundCat.favoriteTypes.find((t) => t.type === type).pokemon;
      }
      if (favorite) {
        return favorite;
      }
    }
    return null;
  }
}
