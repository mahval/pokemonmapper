import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PokemonstorageService } from 'src/app/pokemonstorage.service';
import { listOfAllPokemonSrc } from 'src/app/pokemon';
import { allTypes, allGenerations } from 'src/app/variables';

@Component({
  selector: 'app-selectordialog',
  templateUrl: './selectordialog.component.html',
  styleUrls: ['./selectordialog.component.scss']
})
export class SelectordialogComponent implements OnInit {
  allPokemonTypes = [];
  listOfAllPokemon = [];
  generations = [];
  chosenCategory = null;
  chosenType = '';
  selectedPokemon;

  constructor(
    public dialogRef: MatDialogRef<SelectordialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public pss: PokemonstorageService,
  ) {
    this.listOfAllPokemon = data.listOfAllPokemon;
    // this.noOptionTitle = data.noOptionTitle;
    // this.title = data.title;
    // this.question = data.question;
  }

  ngOnInit() {
    this.allPokemonTypes = allTypes;
    this.generations = allGenerations;
    // this.listOfAllPokemon = listOfAllPokemonSrc;
    this.chosenCategory = this.pss.getChosenCategory();
    this.chosenType = this.pss.getChosenType();
  }

  isPokemonCorrectType(pokemon) {
    this.updateChosenType();
    if (this.chosenType) {
      return (pokemon.types.find(t => t.type.name.toLowerCase() === this.chosenType.toLowerCase()));
    }
  }

  savePokemonAsFavorite(generation: number, type: string, pokemon) {
    // this.selectPokemon(pokemon);
    if (generation === 0) {
      // This is all gens
    }
    this.pss.savePokemon(generation, type, pokemon);
    console.log('selected generation ', generation, ' and type ', type, ' with pokemon ', pokemon);
    this.onNoClick();
  }

  updateChosenCategory() {
    this.chosenCategory = this.pss.getChosenCategory();
  }

  updateChosenType() {
    this.chosenType = this.pss.getChosenType();
  }
  
  toggleGeneration(n: number) {
    this.generations.find(e => e.number === n).show = !this.generations.find(e => e.number === n).show;
  }

  showGeneration(n: number) {
    return this.generations.find(e => e.number === n).show;
  }

  isSelected(pokemon) {
    if (this.selectedPokemon) {
      return (pokemon.pokemonId === this.selectedPokemon.pokemonId);
    }
  }

  selectPokemon(pokemon) {
    this.selectedPokemon = pokemon;
  }

  reset() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }


}
