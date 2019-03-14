import { Component, OnInit } from '@angular/core';
import {UsuarioInterface} from './modelo/UsuarioInterface';
import {UsuarioClass} from './modelo/UsuarioClass';
import { HttpClient } from '@angular/common/http';
import {plainToClass} from "class-transformer";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public listaUsuarios:Array<UsuarioClass>;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTodosUsuarios();
  }
  getTodosUsuarios():void{
    this.http.get("http://localhost:3000/users").subscribe((data:UsuarioClass[])=>{
      const realUsers = plainToClass(UsuarioClass, data);
      this.listaUsuarios=realUsers
      console.log(this.listaUsuarios);
    },(error)=>{
      console.log(error)
    },()=>{
      console.log("terminamos")
    })
  }

}
