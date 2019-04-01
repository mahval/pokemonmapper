export class SimplePokemon {
    pokemonId: number;
    pokemonName: string;
    pokemonSprite: string;
    types: string;
    pokemonGen: number;

    constructor(pokemon) {
        this.pokemonId = pokemon.id;
        this.pokemonName = pokemon.name;
        this.pokemonSprite = pokemon.sprites.front_default;
        this.types = pokemon.types;
        this.pokemonGen = this.getGenByPokemonID(pokemon.id);
    }

    getGenByPokemonID(pokemonid: number): number {
        if (pokemonid <= 151) {
            return 1;
        } else if (151 < pokemonid && pokemonid <= 251) {
            return 2;
        } else if (251 < pokemonid && pokemonid <= 386) {
            return 3;
        } else if (386 < pokemonid && pokemonid <= 493) {
            return 4;
        } else if (493 < pokemonid && pokemonid <= 649) {
            return 5;
        } else if (649 < pokemonid && pokemonid <= 721) {
            return 6;
        } else if (721 < pokemonid && pokemonid <= 809) {
            return 7;
        } else {
            return 8;
        }
    }
}
