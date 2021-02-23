import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';
import { PokemonSelectorComponent } from './pages/quiz/pokemon-selector/pokemon-selector.component';

const routes: Routes = [
  {
    path: '',
    component: IntroComponent,
  },
  {
    path: 'quiz',
    component: PokemonSelectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // , { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(public router: Router) {}
}
