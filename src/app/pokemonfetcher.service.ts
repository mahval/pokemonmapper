import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonfetcherService {
  constructor(private http: HttpClient) {}

  getPokemon(pokemonname: string) {
    return this.http.get<any>(
      'https://pokeapi.co/api/v2/pokemon/' + pokemonname + '/'
    );
  }

  getPokemonFromURL(url: string) {
    return this.http.get<any>(url);
  }

  getPokemonListBasedOnType(type: string) {
    return this.http.get<any>('https://pokeapi.co/api/v2/type/' + type + '/');
  }

  getAllPokemonGenerations() {
    const response1 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/1/'
    );
    const response2 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/2/'
    );
    const response3 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/3/'
    );
    const response4 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/4/'
    );
    const response5 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/5/'
    );
    const response6 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/6/'
    );
    const response7 = this.http.get<any>(
      'https://pokeapi.co/api/v2/generation/7/'
    );
    return forkJoin([
      response1,
      response2,
      response3,
      response4,
      response5,
      response6,
      response7,
    ]);
  }
}
