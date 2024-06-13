import { Injectable } from '@angular/core';
import { PokemonApiResponseDTO } from '../dtos/pokemon-api-response.dto';
import { PokemonDTO } from '../dtos/pokemon.dto';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private apiUrl = 'https://pokeapi.co/api/v2';

  constructor() { }

  async getPokemonList(): Promise<PokemonDTO[]> {
    try {
      console.log('Fetching Pokémon list...');
      const response = await fetch(`${this.apiUrl}/pokemon?limit=20`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: PokemonApiResponseDTO = await response.json();
      console.log('Pokémon list fetched:', data);

      const promises = data.results.map(async pokemon => {
        const detailsResponse = await fetch(pokemon.url);
        const details = await detailsResponse.json();
        return {
          name: this.capitalize(pokemon.name),
          image: details.sprites.front_default,
          types: details.types.map((t: any) => t.type.name)
        } as PokemonDTO;
      });

      return Promise.all(promises);
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  async getPokemonDetails(name: string): Promise<any> {
    try {
      console.log(`Fetching details for Pokémon: ${name}...`);
      const response = await fetch(`${this.apiUrl}/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(`Details for Pokémon ${name} fetched:`, data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }  

  private capitalize(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
