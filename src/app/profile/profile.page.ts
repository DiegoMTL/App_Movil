import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  idSismo: string;
  caracter;

  constructor(
    private activateRoute: ActivatedRoute,
    private http: HttpClient
    ) { }

  ngOnInit() {
    // console.log(this.activateRoute.snapshot.paramMap.get('id'))
    this.idSismo = this.activateRoute.snapshot.paramMap.get("id");
    this.http.get("http://api.jkd.cl:18088/grupo-p/earthquakes/" + this.idSismo)
      .subscribe(res => {
        console.log(res);
        console.log(res[0].fecha);
        this.caracter = res[0];
      })
  }

}
