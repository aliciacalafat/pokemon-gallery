import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokeService } from '../../services/poke.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pokemon: any = null;
  name: string = '';
  showDetails = false;
  showStats = false;
  showAbilities = false;

  constructor(private route: ActivatedRoute, private pokeService: PokeService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name')!;
    this.pokeService.getPokemonDetails(this.name).then(data => {
      this.pokemon = data;
    }).catch(error => {
      console.error('Error fetching Pokémon details:', error);
    });
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  toggleStats(): void {
    this.showStats = !this.showStats;
  }

  toggleAbilities(): void {
    this.showAbilities = !this.showAbilities;
  }
}
