/*LOGICA*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  characters = [];

  constructor(private http: HttpClient) {  }

  ngOnInit(){ //se ejecuta apenas la pagina cargue
    this.http.get<any>("https://rickandmortyapi.com/api/character")
    .subscribe(res => {
      console.log(res);
      this.characters = res.results;
    })
  }

}
