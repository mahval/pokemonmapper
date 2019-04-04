// setAllPokemon() {
//     this.listOfAllPokemon = listOfAllPokemonSrc;
//     // this.pfs.getAllPokemonGenerations().subscribe(res => {
//     //   res.forEach(gen => {
//     //     gen.types.forEach(type => {
//     //       if (type.name !== 'shadow' && type.name !== 'unknown') {
//     //         this.pfs.getPokemonListBasedOnType(type.name).subscribe(list => {
//     //           list.pokemon.forEach(pokemon => {
//     //             if (pokemon.pokemon.url) {
//     //               this.pfs.getPokemonFromURL(pokemon.pokemon.url).subscribe(pkmn => {
//     //                 const found = this.listOfAllPokemon.find(e => e.generationId === getGenByPokemonID(pkmn.id));
//     //                 if (found && !found.pokemonList.find(e => e.pokemonId === pkmn.id)) {
//     //                   found.pokemonList.push(new SimplePokemon(pkmn));
//     //                   this.listOfAllPokemon.forEach(generation => {
//     //                     this.sortPokemonByID(generation.pokemonList);
//     //                   });
//     //                 }
//     //               },
//     //                 error => {
//     //                 },
//     //                 () => {
//     //                   this.listURLsReady = true;
//     //                   if (this.listDataReady) {
//     //                     this.dataReady = true;
//     //                   }
//     //                 });
//     //             }
//     //           });
//     //         },
//     //           error => {
//     //           },
//     //           () => {
//     //             this.listOfAllPokemon.forEach(generation => {
//     //               this.sortPokemonByID(generation.pokemonList);
//     //             });
//     //             this.listDataReady = true;
//     //             if (this.listURLsReady) {
//     //               this.dataReady = true;
//     //             }
//     //           });
//     //       }
//     //     });
//     //   });
//     // },

//     // );
//   }