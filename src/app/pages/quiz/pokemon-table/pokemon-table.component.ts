import { Component, OnInit } from '@angular/core';
import { PokemonfetcherService } from 'src/app/pokemonfetcher.service';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  dataReady = false;

  generations = [
    { number: 1, show: true },
    { number: 2, show: true },
    { number: 3, show: true },
    { number: 4, show: true },
    { number: 5, show: true },
    { number: 6, show: true },
    { number: 7, show: true },
  ];

  allPokemonTypes = [];

  constructor(
    private pfs: PokemonfetcherService
  ) {
    this.setAllPokemonTypes();
  }

  ngOnInit() {
  }

  selectTableBox(generation: number, type: string) {
    console.log('selected generation ', generation, ' and type ', type)
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
    },
    err => {

    },
    () => {
      this.dataReady = true;
    });
  }

}
