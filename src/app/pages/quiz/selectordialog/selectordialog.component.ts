import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PokemonstorageService } from 'src/app/pokemonstorage.service';
import { allGenerations } from 'src/app/variables';

@Component({
  selector: 'app-selectordialog',
  templateUrl: './selectordialog.component.html',
  styleUrls: ['./selectordialog.component.scss'],
})
export class SelectordialogComponent implements OnInit {
  listOfAllPokemon = [];
  generations = [];
  chosenCategory = null;
  chosenType = '';
  selectedPokemon;

  constructor(
    public dialogRef: MatDialogRef<SelectordialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public pss: PokemonstorageService
  ) {
    this.listOfAllPokemon = data.listOfAllPokemon;
  }

  ngOnInit() {
    this.generations = allGenerations;
    this.chosenCategory = this.pss.getChosenCategory();
    this.chosenType = this.pss.getChosenType();
  }

  isPokemonCorrectType(pokemon) {
    this.updateChosenType();
    if (this.chosenType) {
      return pokemon.types.find(
        (t) => t.type.name.toLowerCase() === this.chosenType.toLowerCase()
      );
    }
  }

  savePokemonAsFavorite(generation: number, type: string, pokemon) {
    this.pss.savePokemon(generation, type, pokemon);
    this.onNoClick();
  }

  updateChosenCategory() {
    this.chosenCategory = this.pss.getChosenCategory();
  }

  updateChosenType() {
    this.chosenType = this.pss.getChosenType();
  }

  toggleGeneration(n: number) {
    this.generations.find((e) => e.number === n).show = !this.generations.find(
      (e) => e.number === n
    ).show;
  }

  showGeneration(n: number) {
    return this.generations.find((e) => e.number === n).show;
  }

  isSelected(pokemon) {
    if (this.selectedPokemon) {
      return pokemon.pokemonId === this.selectedPokemon.pokemonId;
    }
  }

  selectPokemon(pokemon) {
    this.selectedPokemon = pokemon;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
