import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule,
  MatSelectModule, MatDividerModule, MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { IntroComponent } from './pages/intro/intro.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultComponent } from './pages/result/result.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonSelectorComponent } from './pages/quiz/pokemon-selector/pokemon-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    QuizComponent,
    ResultComponent,
    PokemonSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
