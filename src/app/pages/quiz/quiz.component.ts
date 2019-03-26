import { Component, OnInit } from '@angular/core';
import { PokemonfetcherService } from 'src/app/pokemonfetcher.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizFormGroup: FormGroup;
  currentPokemon;

  constructor(
    private pfs: PokemonfetcherService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.quizFormGroup = this.fb.group({
      pokemon: 'Pikachu'
    });
    this.getPokemon('Pikachu');
  }

  ngOnInit() {
  }

  getPokemon(pokemonname: string) {
    console.log("hi")
    this.pfs.getPokemon(pokemonname.toLowerCase()).subscribe(result => {
      console.log('Name: ', result.name)
      console.log('REsult: ', result)
      this.currentPokemon = result;
    });
  }

  goHome() {
    this.router.navigate(['']);
  }

}
