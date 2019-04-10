import { Component, OnInit } from '@angular/core';
import { PokemonfetcherService } from 'src/app/pokemonfetcher.service';
import { allTypes, allGenerations } from '../../../variables';
import { PokemonstorageService } from 'src/app/pokemonstorage.service';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  dataReady = false;

  chosenCategory;
  chosenType;

  allPokemonTypes = [];
  generations = [];

  constructor(
    private pfs: PokemonfetcherService,
    private pss: PokemonstorageService
  ) {
    this.allPokemonTypes = allTypes;
    this.generations = allGenerations;
  }

  ngOnInit() {
  }

  selectTableBox(generation: number, type: string) {
    this.pss.selectTableBox(generation, type);
    this.updateChosenCategory();
    this.updateChosenType();
  }

  updateChosenCategory() {
    this.chosenCategory = this.pss.getChosenCategory();
  }

  updateChosenType() {
    this.chosenType = this.pss.getChosenType();
  }

  isTableBoxSelected(generation: number, type: string) {
    return (this.chosenCategory === generation && this.chosenType === type);
  }

  getFavoriteForCategoryAndType(category: number, type: string) {
    const savedFavorites = this.pss.getSavedFavoritesFromLocalStorage();
    let favorite;
    if (savedFavorites) {
      const foundCat = savedFavorites.find(c => c.id === category);
      if (foundCat && foundCat.favoriteTypes && foundCat.favoriteTypes.find(t => t.type === type)) {
        favorite = foundCat.favoriteTypes.find(t => t.type === type).pokemon;
      }
      if (favorite) {
        return favorite;
      }
    }
    return null;
  }
}
