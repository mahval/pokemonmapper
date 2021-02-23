import { Injectable } from '@angular/core';
import { SimplePokemon } from './classes';

@Injectable({
  providedIn: 'root',
})
export class PokemonstorageService {
  totalSavedFavorites = [];

  chosenCategory;
  chosenType;

  constructor() {}

  savePokemon(category: number, type: string, pokemon) {
    const savedFavorites = localStorage.getItem('pokemonMapperFavorites');

    if (!savedFavorites) {
      localStorage.setItem(
        'pokemonMapperFavorites',
        JSON.stringify(this.totalSavedFavorites)
      );
    }

    this.totalSavedFavorites = JSON.parse(
      localStorage.getItem('pokemonMapperFavorites')
    );

    if (!this.totalSavedFavorites.find((e) => e.id === category)) {
      const newCat = new FavoriteCategory(category, []);
      newCat.favoriteTypes.push(new FavoriteType(type, pokemon));
      this.totalSavedFavorites.push(newCat);
    } else {
      if (
        this.totalSavedFavorites
          .find((e) => e.id === category)
          .favoriteTypes.find((f) => f.type === type)
      ) {
        this.totalSavedFavorites
          .find((e) => e.id === category)
          .favoriteTypes.find((f) => f.type === type).pokemon = pokemon;
      } else {
        this.totalSavedFavorites
          .find((e) => e.id === category)
          .favoriteTypes.push(new FavoriteType(type, pokemon));
      }
    }
    localStorage.setItem(
      'pokemonMapperFavorites',
      JSON.stringify(this.totalSavedFavorites)
    );
  }

  getSavedFavoritesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('pokemonMapperFavorites'));
  }

  selectTableBox(generation: number, type: string) {
    this.chosenCategory = generation;
    this.chosenType = type;
  }

  getChosenCategory() {
    return this.chosenCategory;
  }

  getChosenType() {
    return this.chosenType;
  }

  getFavoriteForCategoryAndType(category: number, type: string) {
    let favorite;
    const data = JSON.parse(localStorage.getItem('pokemonMapperFavorites'));
    const foundCat = data.find((c) => c.id === category);
    if (foundCat && foundCat.favoriteTypes) {
      favorite = foundCat.favoriteTypes.find((t) => t === type);
    }
    if (favorite) {
      return favorite.pokemon;
    }
    return null;
  }

  deleteLocalStorage() {
    localStorage.removeItem('pokemonMapperFavorites');
  }
}

export class FavoriteCategory {
  id: number;
  favoriteTypes: FavoriteType[];

  constructor(category, favoriteTypes) {
    this.id = category;
    this.favoriteTypes = favoriteTypes;
  }
}

export class FavoriteType {
  type: string;
  pokemon: SimplePokemon;

  constructor(type, pokemon) {
    this.type = type;
    this.pokemon = pokemon;
  }
}
