import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string = ''
  heroes: Heroe[] = []
  heroeSeleccionado!:Heroe | undefined
  existeHeroe:boolean = true


  constructor(
    private heroesService:HeroesService,
    private router:Router
  ) { }


  ngOnInit(): void {
  }

  buscando() {
    
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => {
        if(heroes.length === 0) {
          this.existeHeroe = false
        }else {
          this.existeHeroe = true
        }
        this.heroes = heroes
      })

  }

  opcionSeleccionada(event:MatAutocompleteSelectedEvent) {

    if(!event.option.value) {
      this.heroeSeleccionado = undefined
      return
    }else {
      const heroe:Heroe = event.option.value
      this.termino = heroe.superhero
  
      this.heroesService.getHeroePorId(heroe.id!)
        .subscribe(heroe => this.heroeSeleccionado = heroe)

      this.router.navigate([`/heroes/${heroe.id}`])  
    }


  }
}
