import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioClass } from './main/modelo/UsuarioClass';
import { Observable, of } from 'rxjs';
import { catchError,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioRestService {
  public url:string = "http://localhost:3000/";
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'atento-llego-el-momento-yo-detengo'
    })
  };

  constructor(private http: HttpClient) { }


  public getTodosUsuarios(): Observable<any> {
    return this.http.get(this.url+"users")
  }

  anyadirUsuario(usuario:UsuarioClass):Observable<any> {
    return this.http.post<UsuarioClass>(this.url+"users", usuario, this.httpOptions)
    .pipe(
      catchError(val => of("I caught: ${val}"))
    );
  }
  eliminarUsuario(idUsuario:number):Observable<any>{
    const url=this.url+"users/"+idUsuario;
    return this.http.delete(url, this.httpOptions)
    .pipe(
      catchError(val => of("I caught: "+val))
    );
  }
  public modificarUsuario(usuario:UsuarioClass):Observable<any>{
    const url=this.url+"users/"+usuario.id;
    console.log(usuario)
    return this.http.put<UsuarioClass>(url,usuario,this.httpOptions)
    .pipe(
      catchError(val => of("I caught: "+val))
    );
  }




  
  


}

