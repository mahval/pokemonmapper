import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonstorageService {

  favorites = [];


  constructor() { }

  savePokemon(category: string, type: string, pokemon) {
    // Save in local storage.
    // var testObject = { 'one': 1, 'two': 2, 'three': 3 };

    // // Put the object into storage
    // localStorage.setItem('testObject', JSON.stringify(testObject));

    // // Retrieve the object from storage
    // var retrievedObject = localStorage.getItem('testObject');

    // console.log('retrievedObject: ', JSON.parse(retrievedObject));

  }
}

export class FavoriteCategory {
  favoriteTypes: FavoriteType[];
}

export class FavoriteType {
  type: string;
  pokemon: any;
}
