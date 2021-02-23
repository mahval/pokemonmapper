import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDialogModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { IntroComponent } from './pages/intro/intro.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonSelectorComponent } from './pages/quiz/pokemon-selector/pokemon-selector.component';
import { PokemonTableComponent } from './pages/quiz/pokemon-table/pokemon-table.component';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { SelectordialogComponent } from './pages/quiz/selectordialog/selectordialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    PokemonSelectorComponent,
    PokemonTableComponent,
    ConfirmdialogComponent,
    SelectordialogComponent,
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
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
  ],
  providers: [ConfirmdialogComponent, SelectordialogComponent],
  entryComponents: [ConfirmdialogComponent, SelectordialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
