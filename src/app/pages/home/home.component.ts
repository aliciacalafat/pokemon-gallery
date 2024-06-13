import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeService } from '../../services/poke.service';
import { Router, RouterModule } from '@angular/router';
import { PokemonDTO } from '../../dtos/pokemon.dto';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(100, [
            animate('0.3s', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  pokemonList: PokemonDTO[] = [];
  viewMode: 'card' | 'table' = 'card';
  loading = true;

  constructor(private pokeService: PokeService, private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent initialized');
    this.pokeService.getPokemonList().then(data => {
      console.log('Pokémon list data received:', data);
      this.pokemonList = data;
      this.loading = false;
    }).catch(error => {
      console.error('Error fetching Pokémon list:', error);
      this.loading = false;
    });
  }

  toggleViewMode(mode: 'card' | 'table'): void {
    console.log('Toggling view mode to:', mode);
    this.viewMode = mode;
  }

  viewDetails(name: string): void {
    console.log('Navigating to details of Pokémon:', name);
    this.router.navigate(['/detail', name]);
  }
}
