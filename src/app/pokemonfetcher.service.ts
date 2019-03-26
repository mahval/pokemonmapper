import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonfetcherService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemon(pokemonname: string) {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + pokemonname + '/');
  }

  getPokemonFromURL(url: string) {
    return this.http.get<any>(url);
  }

  getPokemonListBasedOnType(type: string) {
    return this.http.get<any>('https://pokeapi.co/api/v2/type/' + type + '/');
  }
}
